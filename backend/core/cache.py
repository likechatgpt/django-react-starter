# File: backend/core/cache.py
from functools import wraps
from typing import Any, Callable, Optional
from django.core.cache import cache
from django.http import HttpRequest
from rest_framework.response import Response
import hashlib
import json


def cache_api_response(
    timeout: int = 300,
    key_prefix: Optional[str] = None,
    vary_on_user: bool = False,
    vary_on_params: bool = True,
) -> Callable:
    """
    Decorator to cache API responses using Redis.

    Args:
        timeout: Cache timeout in seconds (default: 300 = 5 minutes)
        key_prefix: Optional prefix for cache keys
        vary_on_user: If True, cache separately per authenticated user
        vary_on_params: If True, include query parameters in cache key

    Example:
        @cache_api_response(timeout=600, key_prefix="products")
        def list(self, request):
            return super().list(request)
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Response:
            # Build cache key
            cache_key_parts = []

            # Add prefix
            if key_prefix:
                cache_key_parts.append(key_prefix)
            else:
                cache_key_parts.append(f"{self.__class__.__name__}.{func.__name__}")

            # Add user ID if varying on user
            if vary_on_user and hasattr(request, "user") and request.user.is_authenticated:
                cache_key_parts.append(f"user:{request.user.id}")

            # Add query parameters if varying on params
            if vary_on_params and request.GET:
                params_hash = hashlib.md5(
                    json.dumps(dict(request.GET), sort_keys=True).encode()
                ).hexdigest()
                cache_key_parts.append(f"params:{params_hash}")

            # Add URL kwargs (like pk for detail views)
            if kwargs:
                kwargs_hash = hashlib.md5(
                    json.dumps(kwargs, sort_keys=True).encode()
                ).hexdigest()
                cache_key_parts.append(f"kwargs:{kwargs_hash}")

            cache_key = ":".join(cache_key_parts)

            # Try to get cached response
            cached_response = cache.get(cache_key)
            if cached_response is not None:
                return Response(cached_response)

            # Call the original function
            response = func(self, request, *args, **kwargs)

            # Cache successful responses
            if hasattr(response, "data") and 200 <= response.status_code < 300:
                cache.set(cache_key, response.data, timeout)

            return response

        return wrapper
    return decorator


def invalidate_cache_pattern(pattern: str) -> None:
    """
    Invalidate all cache keys matching a pattern.

    Args:
        pattern: Pattern to match cache keys (e.g., "ProductViewSet*")

    Example:
        # In a signal handler or update view
        invalidate_cache_pattern("ProductViewSet*")
    """
    try:
        from django_redis import get_redis_connection
        redis_conn = get_redis_connection("default")

        # Get all keys matching the pattern
        keys = redis_conn.keys(f"*{pattern}*")
        if keys:
            redis_conn.delete(*keys)
    except Exception:
        # Fallback: just pass if redis is not available
        pass


def invalidate_cache_keys(*keys: str) -> None:
    """
    Invalidate specific cache keys.

    Args:
        *keys: Cache keys to invalidate

    Example:
        invalidate_cache_keys("products:list", "products:detail:123")
    """
    for key in keys:
        cache.delete(key)