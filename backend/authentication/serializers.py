# File: backend/authentication/serializers.py
from typing import TYPE_CHECKING, Any, Dict
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers

if TYPE_CHECKING:
    from user.models import User as UserType

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)
    password = serializers.CharField(write_only=True, allow_blank=False, allow_null=False)

    class Meta:
        fields = ["email", "password"]

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        email = data.get("email")
        password = data.get("password")
        # Fix: Use username=email instead of email=email
        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        data["user"] = user
        return data


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )
    confirmPassword = serializers.CharField(write_only=True, allow_blank=False, allow_null=False)

    class Meta:
        fields = ["email", "password", "confirmPassword"]

    def validate_email(self, email: str) -> str:
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("This email is already used")
        return email

    @staticmethod
    def validate_password(value: str) -> str:
        validate_password(value)
        return value

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        password = data.get("password")
        confirm_password = data.get("confirmPassword")
        
        if not confirm_password:
            raise serializers.ValidationError({"confirmPassword": ["Confirm password is required"]})
        
        if password != confirm_password:
            raise serializers.ValidationError({"confirmPassword": ["Passwords do not match"]})
        
        return data

    def create(self, validated_data: Dict[str, Any]) -> "UserType":
        # Remove confirmPassword from validated_data as it's not needed for user creation
        validated_data.pop("confirmPassword", None)
        
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            is_active=True,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)

    class Meta:
        fields = ["email"]


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(write_only=True, allow_blank=False, allow_null=False)
    uid = serializers.IntegerField(write_only=True)
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["token", "uid", "password"]

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        user_id = data.get("uid")
        token = data.get("token")
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError({"token": ["Invalid token"]})

        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            raise serializers.ValidationError({"token": ["Invalid token"]})

        data["user"] = user
        return data

    def save(self, **kwargs: Any) -> "UserType":
        user = self.validated_data["user"]
        user.set_password(self.validated_data["password"])
        user.save()
        return user