import os
import imp

config_path = os.getenv('CONFIG_FILE', "settings.py")
if config_path == 'test':
    config_path = "settings_test.py"
try:
    config = imp.load_source("config", config_path)
except BaseException:
    raise RuntimeError("Cannot find the settings file %s" % config_path)
