# File: backend/authentication/urls.py
from django.urls import path
from .views import (
    get_csrf_token,
    LoginAPIView,
    LogoutAPIView,
    RegisterAPIView,
    PasswordResetAPIView,
    PasswordResetConfirmAPIView,
)

app_name = "authentication"

urlpatterns = [
    path("csrf/", get_csrf_token, name="csrf"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("password-reset/", PasswordResetAPIView.as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmAPIView.as_view(), name="password-reset-confirm"),
]