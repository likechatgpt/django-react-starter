# File: backend/django_react_starter/settings/base.py
import os
from pathlib import Path
import logging

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# --------------------------------------------------------------------------------
# > Application
# --------------------------------------------------------------------------------
APP_NAME = "django_react_starter"
APP_VERSION = os.getenv("APP_VERSION", "v0.0.0")
SESSION_COOKIE_NAME = f"{APP_NAME}-sessionid"
CSRF_COOKIE_NAME = f"{APP_NAME}-csrftoken"

SECRET_KEY = os.getenv("SECRET_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"

if not SECRET_KEY:
    raise ValueError("SECRET_KEY must be set in environment variables.")

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "django_prometheus",
    "django_celery_results",
    # Custom
    "authentication",
    "core",
    "health",
    "user",
    "products",
    "downloads",
]

MIDDLEWARE = [
    "django_prometheus.middleware.PrometheusBeforeMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.gzip.GZipMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "core.middleware.PermissionsPolicyMiddleware",
    "django_prometheus.middleware.PrometheusAfterMiddleware",
]

ROOT_URLCONF = "django_react_starter.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "django_react_starter", "templates"),
            os.path.join(BASE_DIR, "frontend"),
            # Add the dist folder directly so Django can find dist/index.html
            os.path.join(BASE_DIR.parent, "frontend", "dist"),
            # Also add the parent frontend folder as a fallback
            os.path.join(BASE_DIR.parent, "frontend"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "django_react_starter.wsgi.application"

# --------------------------------------------------------------------------------
# > Static files
# --------------------------------------------------------------------------------
STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static-files")
STATICFILES_DIRS = [
    os.path.join(BASE_DIR.parent, "frontend", "dist", "static"),
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --------------------------------------------------------------------------------
# > Media files
# --------------------------------------------------------------------------------
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# --------------------------------------------------------------------------------
# > Database
# --------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# PostgreSQL configuration
POSTGRES_DB = os.getenv("POSTGRES_DB", "django_react_starter")
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "postgres")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": POSTGRES_DB,
        "USER": POSTGRES_USER,
        "PASSWORD": POSTGRES_PASSWORD,
        "HOST": POSTGRES_HOST,
        "PORT": POSTGRES_PORT,
        "CONN_MAX_AGE": 600,
        "OPTIONS": {
            "connect_timeout": 10,
        },
    }
}

# --------------------------------------------------------------------------------
# > User, Passwords, and Authentication
# --------------------------------------------------------------------------------
AUTH_USER_MODEL = "user.User"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LOGIN_REDIRECT_URL = "/"
PASSWORD_RESET_TIMEOUT = 30 * 60  # 30 minutes

DJANGO_SUPERUSER_EMAIL = os.getenv("DJANGO_SUPERUSER_EMAIL", "kowaljordan@gmail.com")
DJANGO_SUPERUSER_PASSWORD = os.getenv("DJANGO_SUPERUSER_PASSWORD", "password")

# --------------------------------------------------------------------------------
# > Internationalization
# --------------------------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------------------------------------
# > DRF
# --------------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

# --------------------------------------------------------------------------------
# > Logging
# --------------------------------------------------------------------------------
MAX_SIZE = 1_000_000  # 1Mo
BACKUP_COUNT = 2
LOG_FOLDER = os.path.join(BASE_DIR, "logs")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "{asctime} | {levelname} | {message}",
            "style": "{",
        },
    },
    "filters": {},
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "console.log": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "simple",
            "filename": os.path.join(LOG_FOLDER, "console.log"),
            "maxBytes": MAX_SIZE,
            "backupCount": BACKUP_COUNT,
        },
    },
    "loggers": {
        "default": {
            "handlers": ["console.log", "console"],
            "level": "INFO",
            "propagate": True,
        },
    },
}

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s",
)

LOGGING["loggers"]["authentication"] = {
    "handlers": ["console"],
    "level": "DEBUG",
    "propagate": True,
}

LOGGING["loggers"]["django.request"] = {
    "handlers": ["console"],
    "level": "DEBUG",
    "propagate": True,
}

# --------------------------------------------------------------------------------
# > Email
# --------------------------------------------------------------------------------
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "fake-email@fake_domain.fake")
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# --------------------------------------------------------------------------------
# > Sentry
# --------------------------------------------------------------------------------
SENTRY_INITIALIZED = False

# --------------------------------------------------------------------------------
# > Meilisearch
# --------------------------------------------------------------------------------
MEILISEARCH_HOST = os.getenv("MEILISEARCH_HOST", "http://localhost:7700")
MEILISEARCH_API_KEY = os.getenv("MEILISEARCH_API_KEY", "")

# --------------------------------------------------------------------------------
# > Celery + RabbitMQ
# --------------------------------------------------------------------------------
RABBITMQ_HOSTNAME = os.getenv("RABBITMQ_HOSTNAME", "localhost")
RABBITMQ_PORT = os.getenv("RABBITMQ_PORT", "5672")
RABBITMQ_USERNAME = os.getenv("RABBITMQ_USERNAME", "guest")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "guest")
RABBITMQ_URL = (
    f"amqp://{RABBITMQ_USERNAME}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOSTNAME}:{RABBITMQ_PORT}"
)
RABBITMQ_ADMIN_URL = os.getenv("RABBITMQ_ADMIN_URL", "http://localhost:15672")
RABBITMQ_HEALTHCHECK_URL = f"{RABBITMQ_ADMIN_URL}/api/healthchecks/node"

CELERY_CONFIG_PREFIX = "CELERY"
CELERY_BROKER_URL = RABBITMQ_URL
CELERY_RESULT_BACKEND = "django-db"
CELERY_RESULT_EXTENDED = True
CELERY_CACHE_BACKEND = "default"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"

RABBITMQ_USER_QUEUE = "user-queue"

# --------------------------------------------------------------------------------
# > Redis Cache
# --------------------------------------------------------------------------------
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
REDIS_DB = os.getenv("REDIS_DB", "0")
REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}"

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {
                "max_connections": 50,
                "retry_on_timeout": True,
            },
            "SOCKET_CONNECT_TIMEOUT": 5,
            "SOCKET_TIMEOUT": 5,
        },
        "KEY_PREFIX": f"{APP_NAME}",
        "TIMEOUT": 300,  # Default timeout: 5 minutes
    }
}

# --------------------------------------------------------------------------------
# > CORS Configuration
# --------------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True