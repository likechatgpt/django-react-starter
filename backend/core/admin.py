# File: backend/core/admin.py
"""Custom admin configuration for hiding unwanted models."""

from django.contrib import admin
from django.contrib.admin.sites import NotRegistered
from django.contrib.auth.models import Group

from django_celery_results.models import GroupResult, TaskResult


def _safe_unregister(model):
    """Unregister a model from the admin site if it is currently registered."""

    try:
        admin.site.unregister(model)
    except NotRegistered:
        pass


for model in (Group, GroupResult, TaskResult):
    _safe_unregister(model)
