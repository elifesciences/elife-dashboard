import configparser
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_NAME = 'dashboard_2'

# dynamic config
CFG_PATH = os.path.join(BASE_DIR, '..')
CFG_NAME = 'app.cfg'
CONF = configparser.ConfigParser()
CONF.read(os.path.join(CFG_PATH, CFG_NAME))

# eLife
PREVIEW_BASE_URL = CONF.get('elife', 'preview_base_url', fallback='')

# AWS
AWS_ACCESS_KEY_ID = CONF.get('aws', 'aws_access_key_id', fallback='')
AWS_SECRET_ACCESS_KEY = CONF.get('aws', 'aws_access_key_id', fallback='')

# SQS
SQS_REGION = CONF.get('sqs', 'sqs_region', fallback='')
EVENT_MONITOR_QUEUE = CONF.get('sqs', 'event_monitor_queue', fallback='')
WORK_FLOW_STARTER_QUEUE = CONF.get('sqs', 'work_flow_starter_queue', fallback='')
EVENT_QUEUE_POOL_SIZE = CONF.get('sqs', 'event_queue_pool_size', fallback=5)
EVENT_QUEUE_MESSAGE_COUNT = CONF.get('sqs', 'event_queue_message_count', fallback=5)

# Article scheduler
ARTICLE_SCHEDULER_URL = CONF.get('article_scheduler', 'article_scheduler_url', fallback='')
ARTICLE_SCHEDULE_PUBLICATION_URL = CONF.get('article_scheduler', 'article_scheduler_publication_url', fallback='')
ARTICLE_SCHEDULE_RANGE_URL = CONF.get('article_scheduler', 'article_scheduler_range_url', fallback='')


SECRET_KEY = CONF.get('django', 'secret_key')

DEBUG = CONF.get('django', 'debug', fallback=False)

ALLOWED_HOSTS = []

INTERNAL_IPS = '127.0.0.1'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    # 'django.contrib.messages',
    'django.contrib.staticfiles',
    'debug_toolbar',
    'django_filters',
    'rest_framework',
    'articles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'dashboard.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dashboard.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': CONF.get('database', 'engine'),
        'USER': CONF.get('database', 'user'),
        'PASSWORD': CONF.get('database', 'password'),
        'HOST': CONF.get('database', 'host'),
        'PORT': CONF.get('database', 'port'),
        'NAME': CONF.get('database', 'name'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, '%s.log' % PROJECT_NAME),
            'formatter': 'verbose'
        },
        'debug-console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },

    'loggers': {
        'django': {
            'handlers': ['file'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'dashboard': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
    }
}

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

DEBUG_TOOLBAR_CONFIG = {
    'RESULTS_STORE_SIZE': 100,
}
