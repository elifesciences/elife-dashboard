import logging
from logging.config import dictConfig
from pythonjsonlogger import jsonlogger

# "2023-03-14 16:37:06,661 - INFO - MainProcess - dashboard - app configured"
LOG_FORMAT = '%(asctime)-15s - %(levelname)s - %(processName)s - %(name)s - %(message)s'

def init_logging(nom, output_file, log_level):
    """configures the logger `nom` with stream and file handlers at the given `log_level`.
    stream handlers write to stdout and are visible with the dev server and by journalctl.
    their output is human friendly.
    file handlers write to a file and their output is in JSON, which is machine friendly.
    passing `extra={...}` to a `LOG` call will add the extra parameters to the FileHandler,
    but not the StreamHandler.

    `init_logging` only needs to be called once per app instance."""

    logger = logging.getLogger(nom)
    logger.setLevel(log_level)
    
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    logger.addHandler(stream_handler)
    
    file_handler = logging.FileHandler(output_file)
    file_handler.setFormatter(jsonlogger.JsonFormatter(LOG_FORMAT))
    logger.addHandler(file_handler)

    logger.debug("logging for %r configured", nom)
