# File: backend/health/views.py
from django.conf import settings
from django.db import connection
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import logging

logger = logging.getLogger(__name__)


class HealthCheckView(APIView):
    """
    Basic health check endpoint that returns 200 OK if the service is running.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {
                "status": "healthy",
                "service": "django-react-starter",
                "version": getattr(settings, 'APP_VERSION', 'unknown'),
                "environment": getattr(settings, 'ENVIRONMENT', 'unknown'),
            },
            status=status.HTTP_200_OK
        )


class ReadinessView(APIView):
    """
    Readiness check that verifies all dependencies are available.
    Returns 200 if ready, 503 if not ready.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        checks = {
            "database": self._check_database(),
            "static_files": self._check_static_files(),
        }
        
        # Add optional service checks
        if hasattr(settings, 'RABBITMQ_HEALTHCHECK_URL'):
            checks["rabbitmq"] = self._check_rabbitmq()
        
        if hasattr(settings, 'MEILISEARCH_HOST'):
            checks["meilisearch"] = self._check_meilisearch()
        
        # Determine overall health
        all_healthy = all(check["healthy"] for check in checks.values())
        overall_status = "ready" if all_healthy else "not ready"
        
        response_data = {
            "status": overall_status,
            "checks": checks,
        }
        
        return Response(
            response_data,
            status=status.HTTP_200_OK if all_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        )
    
    def _check_database(self):
        """Check if database is accessible."""
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
            return {"healthy": True, "message": "Database is accessible"}
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            return {"healthy": False, "message": str(e)}
    
    def _check_static_files(self):
        """Check if static files are configured."""
        try:
            static_root = getattr(settings, 'STATIC_ROOT', None)
            if static_root:
                return {"healthy": True, "message": "Static files configured"}
            return {"healthy": False, "message": "STATIC_ROOT not configured"}
        except Exception as e:
            logger.error(f"Static files check failed: {e}")
            return {"healthy": False, "message": str(e)}
    
    def _check_rabbitmq(self):
        """Check if RabbitMQ is accessible."""
        try:
            url = settings.RABBITMQ_HEALTHCHECK_URL
            auth = (settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
            response = requests.get(url, auth=auth, timeout=5)
            if response.status_code == 200:
                return {"healthy": True, "message": "RabbitMQ is accessible"}
            return {"healthy": False, "message": f"RabbitMQ returned status {response.status_code}"}
        except Exception as e:
            logger.error(f"RabbitMQ health check failed: {e}")
            return {"healthy": False, "message": str(e)}
    
    def _check_meilisearch(self):
        """Check if Meilisearch is accessible."""
        try:
            url = f"{settings.MEILISEARCH_HOST}/health"
            headers = {}
            if hasattr(settings, 'MEILISEARCH_API_KEY') and settings.MEILISEARCH_API_KEY:
                headers['Authorization'] = f'Bearer {settings.MEILISEARCH_API_KEY}'
            response = requests.get(url, headers=headers, timeout=5)
            if response.status_code == 200:
                return {"healthy": True, "message": "Meilisearch is accessible"}
            return {"healthy": False, "message": f"Meilisearch returned status {response.status_code}"}
        except Exception as e:
            logger.error(f"Meilisearch health check failed: {e}")
            return {"healthy": False, "message": str(e)}