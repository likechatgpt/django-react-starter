# File: django_react_starter/urls.py
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from django_prometheus import exports

from core.views import AppViewSet, index, robots_txt

# Create the app config view from the ViewSet
app_config_view = AppViewSet.as_view({
    "get": "config",
})

urlpatterns = [
    # Admin - MUST be first and specific
    path("admin/", admin.site.urls),
    
    # API endpoints
    path("api/v1/auth/", include("authentication.urls")),
    path("api/v1/self/", include("user.urls")),  # Only include user.urls once
    path("api/v1/", include("downloads.urls")),  # Downloads API
    path("api/v1/", include("products.urls")),   # Products API
    
    # App config (for CSRF token and app settings)
    path("api/v1/app/config/", app_config_view, name="app-config"),
    
    # API Documentation
    path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/v1/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/v1/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    
    # Prometheus metrics
    path("metrics/", exports.ExportToDjangoView, name="prometheus-django-metrics"),
    
    # Robots.txt
    path("robots.txt", robots_txt, name="robots-txt"),
]

# Include health check URLs if the app exists
try:
    from health.views import HealthCheckView, ReadinessView
    urlpatterns += [
        path("api/v1/health/", HealthCheckView.as_view(), name="health"),
        path("api/v1/readiness/", ReadinessView.as_view(), name="readiness"),
    ]
except ImportError:
    # Health checks not available, skip them
    pass

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all pattern for React - MUST be last and exclude admin/api routes
urlpatterns += [
    path("", index, name="index"),
    # Use regex to exclude admin and api routes from the catch-all
    re_path(r"^(?!admin|api|robots\.txt|metrics).*$", TemplateView.as_view(template_name="index.html")),
]