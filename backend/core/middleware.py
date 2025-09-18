# File: backend/core/middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.views.decorators.csrf import csrf_exempt


class CSRFExemptAPIMiddleware(MiddlewareMixin):
    """
    Middleware to exempt API endpoints from CSRF protection in development.
    This should ONLY be used in development!
    """

    def process_view(self, request, view_func, view_args, view_kwargs):
        # Only exempt API endpoints
        if request.path.startswith('/api/'):
            return csrf_exempt(view_func)(request, *view_args, **view_kwargs)
        return None


class PermissionsPolicyMiddleware(MiddlewareMixin):
    """
    Middleware to set Permissions-Policy header to allow unload events.
    This fixes the "unload is not allowed in this document" error in Django admin.
    """
    
    def process_response(self, request, response):
        # Set permissions policy to allow unload events
        response['Permissions-Policy'] = 'unload=*'
        return response