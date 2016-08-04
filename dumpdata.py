import config_decider.config as settings
import subprocess
cmd = "PGPASSWORD=%(password)s /usr/lib/postgresql/9.4/bin/pg_dump -h %(host)s -U %(user)s %(database)s" % settings.__dict__
print subprocess.check_output(cmd, shell=True)
