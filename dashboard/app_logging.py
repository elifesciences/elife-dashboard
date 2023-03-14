import logging

LOG_FORMAT = '%(asctime)-15s - %(levelname)s - %(processName)s - %(name)s - %(message)s'

def init_logging(nom, output_file, log_level):
    """configures the named logger with a file handler and log threshold.
    only needs to be called once one app instance.
    """
    logger = logging.getLogger(nom)
    
    formatter = logging.Formatter(LOG_FORMAT)
    fh = logging.FileHandler(output_file)
    fh.setFormatter(formatter)
    
    logger.setLevel(log_level)
    logger.addHandler(fh)
