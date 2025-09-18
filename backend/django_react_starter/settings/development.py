# File: backend/django_react_starter/settings/development.py
import os
from .base import *

DEBUG = True
ENVIRONMENT = "development"
APP_VERSION = "v0.0.0"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "api",
    "*",  # Allow all hosts in development
]

# Add corsheaders to INSTALLED_APPS
INSTALLED_APPS = list(INSTALLED_APPS)  # Convert tuple to list if needed
if "corsheaders" not in INSTALLED_APPS:
    # Insert after staticfiles to keep ordering sane in dev
    insert_after = INSTALLED_APPS.index("django.contrib.staticfiles") + 1 if "django.contrib.staticfiles" in INSTALLED_APPS else len(INSTALLED_APPS)
    INSTALLED_APPS.insert(insert_after, "corsheaders")

# Add CorsMiddleware to MIDDLEWARE
MIDDLEWARE = list(MIDDLEWARE)  # Convert tuple to list if needed
if "corsheaders.middleware.CorsMiddleware" not in MIDDLEWARE:
    # Per docs, put it as high as possible, before CommonMiddleware
    if "django.middleware.common.CommonMiddleware" in MIDDLEWARE:
        common_index = MIDDLEWARE.index("django.middleware.common.CommonMiddleware")
        MIDDLEWARE.insert(common_index, "corsheaders.middleware.CorsMiddleware")
    else:
        MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Allow credentials for authentication
CORS_ALLOW_CREDENTIALS = True

# Allow these headers
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# CSRF settings - IMPORTANT CHANGES HERE
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

# CRITICAL: Set these for cross-domain CSRF to work
CSRF_COOKIE_SAMESITE = 'Lax'  # Changed from default 'Strict'
CSRF_COOKIE_HTTPONLY = False  # Allow JavaScript to read the cookie
SESSION_COOKIE_SAMESITE = 'Lax'  # Changed from default 'Strict'

# Optional: If you still have issues, uncomment these:
# CSRF_USE_SESSIONS = False  # Store CSRF token in cookie, not session
# CSRF_COOKIE_SECURE = False  # Don't require HTTPS in development

SITE_DOMAIN = "http://localhost:3000"

SECRET_KEY = "yq-^$c^8r-^zebn#n+ilw3zegt9^9!b9@)-sv1abpca3i%hrko"
DJANGO_SUPERUSER_EMAIL = "kowaljordan@gmail.com"
DJANGO_SUPERUSER_PASSWORD = "password"

# Database configuration for development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}