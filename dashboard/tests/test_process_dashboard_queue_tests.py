import unittest
import process_dashboard_queue
from unittest.mock import patch
from dashboard.exceptions import ShortRetryException
import dashboard.models.articles as articles
import psycopg2

message_from_process_message = {"status": "end", "version": "1", "run": "54dd39d7-a863-448c-96af-ae64ab66567f", "event_type": "Apply Version Number", "timestamp": "2016-03-23T15:15:22.620270", "message": "Finished applying version number to article 00353 for version 1 run 54dd39d7-a863-448c-96af-ae64ab66567f", "message_type": "event", "message_id": "f1392251-db64-4f6c-acb3-73b64aa79d9d", "item_identifier": "00353"}
message_from_process_event_message = {'status': 'end', 'run': '54dd39d7-a863-448c-96af-ae64ab66567f', 'event_type': 'Apply Version Number', 'timestamp': '2016-03-23T12:15:22.620270', 'version': '1', 'message': 'Finished applying version number to article 00353 for version 1 run 54dd39d7-a863-448c-96af-ae64ab66567f', 'message_type': 'event', 'message_id': 'f1392251-db64-4f6c-acb3-73b64aa79d9d', 'item_identifier': '00353'}
message_from_process_property_message = {"version": "1", "run": "54dd39d7-a863-448c-96af-ae64ab66567f", "property_type": "text", "timestamp": "2016-03-23T12:15:22.620270", "message": "Some message", "message_type": "property", "message_id": "f1392251-db64-4f6c-acb3-73b64aa79d9d", "item_identifier": "00353"}


class FakeConnection:
    def commit(self):
        pass

    def close(self):
        pass

class FakeCursor:
    def __init__(self):
        self.executed_times = 0

    def execute(self, param1=None, param2=None):
        if self.executed_times == 0:
            self.executed_times += 1
            return
        raise Exception()

    def close(self):
        pass

    def fetchone(self, result=None):
        return result

class FakeCursorWorksAfterUniqueViolation:
    def __init__(self):
        self.executed_times = 0

    def execute(self, param1=None, param2=None):
        if self.executed_times == 0:
            self.executed_times += 1
            return
        if self.executed_times == 1:
            raise Exception()

    def close(self):
        pass

    def fetchone(self, result=None):
        return (10, '00353')

class FakeCursorWorksFirstTime:
    def execute(self, param1=None, param2=None):
        pass

    def close(self):
        pass

    def fetchone(self, result=None):
        return (10, '00353')

class FakeLastLogging:
    def __init__(self):
        self.logging_debug = "First log debug"
        self.logging_exception = "First log exception"

    def debug(self, log):
        self.logging_debug = log

    def exception(self, log):
        self.logging_exception = log

    def get_log_debug(self):
        return self.logging_debug

    def get_log_exception(self):
        return self.logging_exception

class FakeLogger:
    def __init__(self):
        self.logdebug = "First logger debug"
        self.loginfo = "First logger info"
        self.logexception = "First logger exception"

    def debug(self, msg):
        self.logdebug = msg

    def info(self, msg):
        self.loginfo = msg

    def exception(self, msg, *args, **kwargs):
        self.logexception = msg

class FakeQueue:
    def read(self, visibility_timeout=None, wait_time_seconds=None):
        pass


def fake_get_connection(connection, cursor):
    conn = connection
    cur = cursor
    return conn, cur


class TestProcessDashboardQueue(unittest.TestCase):

    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_articles_get_article_id(self, mock_get_connection, mock_commit_and_close_conn):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursorWorksAfterUniqueViolation())
        mock_commit_and_close_conn.side_effect = None
        article_id = articles._get_article_id('00353')
        self.assertEqual(10, article_id)

    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_process_property_message_short_retry_exception(self, mock_get_connection, mock_commit_and_close_conn):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursor())
        mock_commit_and_close_conn.side_effect = None
        attempt = self._process_property_message(message_from_process_message)
        self.assertRaises(ShortRetryException, attempt)

    @patch('dashboard.models.articles.LOG')
    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_process_property_message_no_property_type(self, mock_get_connection, mock_commit_and_close_conn, mock_logging):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursorWorksAfterUniqueViolation())
        mock_commit_and_close_conn.side_effect = None
        fake_last_logging = FakeLastLogging()
        mock_logging.return_value = fake_last_logging
        attempt = self._process_property_message(message_from_process_message)
        attempt()
        self.assertTrue(mock_logging.exception.called)

    @patch('process_dashboard_queue.LOG.exception')
    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_process_property_message_unique_violation_psycopg2_error(self, mock_get_connection, mock_commit_and_close_conn, mock_logger_exception):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursorWorksAfterUniqueViolation())
        mock_commit_and_close_conn.side_effect = None
        fake_logger = FakeLogger()
        mock_logger_exception.side_effect = fake_logger.exception
        attempt = self._process_property_message(message_from_process_property_message)
        attempt()
        self.assertRaises(Exception)
        self.assertEqual("Error processing property message: %s", fake_logger.logexception)

    @patch('dashboard.models.articles.LOG')
    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_process_property_message_unique_violation_select(self, mock_get_connection, mock_commit_and_close_conn, mock_logging):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursorWorksFirstTime())
        mock_commit_and_close_conn.side_effect = None
        attempt = self._process_property_message(message_from_process_property_message)
        attempt()
        self.assertTrue(mock_logging.debug.called)

    @patch('dashboard.models.articles._store_message')
    @patch('dashboard.models.articles._get_article_id')
    @patch('dashboard.models.articles.LOG')
    @patch('dashboard.models.articles._commit_and_close_connection')
    @patch('dashboard.models.articles._get_connection')
    def test_process_event_message(self, mock_get_connection, mock_commit_and_close_conn, mock_logging, mock_get_article_id, mock_store_message):
        mock_get_connection.return_value = fake_get_connection(FakeConnection(), FakeCursor())
        mock_commit_and_close_conn.side_effect = None
        mock_get_article_id.return_value = 10
        mock_store_message.side_effect = None
        process_dashboard_queue.process_event_message(message_from_process_event_message)
        self.assertTrue(mock_logging.debug.called)

    @patch('process_dashboard_queue.LOG.exception')
    def test_process_event_message_exception(self, mock_logger_exception):
        fake_logger = FakeLogger()
        mock_logger_exception.side_effect = fake_logger.exception
        message = {}  # pass in bad message
        process_dashboard_queue.process_event_message(message)
        self.assertEqual("Error processing event message: %s", fake_logger.logexception)

    def _process_property_message(self, message):
        return lambda: process_dashboard_queue.process_property_message(message)

    def _process_dashboard_queue(self):
        return lambda: process_dashboard_queue.main()


if __name__ == '__main__':
    unittest.main()
