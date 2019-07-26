import unittest
import test_database as db
import dashboard.models.articles as articles
import fixtures



class MyTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        db.test_database_setup()

    @classmethod
    def tearDownClass(cls):
        db.test_database_destroy()

    def setUp(self):
        db.run(db.create_tables_schema)

    def tearDown(self):
        pass

    def test_store_message(self):
        #given
        db.run(db.create_random_message)
        message_id = fixtures.message_id_example
        timestamp = fixtures.timestamp_example

        #when
        conn, cur = db.get_connection()
        articles._store_message(cur,message_id,timestamp)
        db.commit_close_connection(conn,cur)

        #then
        count = db.retrieve_first("select count(message_id) from message")
        self.assertEqual(2, count)

    def test_store_message_duplicate_does_not_get_added(self):
        #given
        db.run(db.create_messages_including_example)
        message_id = fixtures.message_id_example
        timestamp = fixtures.timestamp_example

        #when
        try:
            conn, cur = db.get_connection()
            articles._store_message(cur,message_id,timestamp)
            db.commit_close_connection(conn,cur)
        except Exception as e:
            self.fail("test_repeated_message_does_not_get_added raised an exception. Details: " + str(e))

        #then
        count = db.retrieve_first("select count(message_id) from message")
        self.assertEqual(2, count)


if __name__ == '__main__':
    unittest.main()
