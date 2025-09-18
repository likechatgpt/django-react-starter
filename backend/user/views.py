# File: backend/user/views.py
from django.contrib.auth import get_user_model, logout, update_session_auth_hash
from django_utils_kit.viewsets import ImprovedViewSet
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from user.serializers import (
    UpdatePasswordSerializer,
    UserSimpleSerializer,
)

User = get_user_model()


class CurrentUserViewSet(ImprovedViewSet):
    """For the current user to view/update some of its information."""

    default_permission_classes = [IsAuthenticated]
    permission_classes_per_action = {
        # Allow account endpoint to be accessed without authentication
        # so frontend can check if user is logged in
        "account": [AllowAny],
        "password": [IsAuthenticated],
    }
    serializer_class_per_action = {
        "account": UserSimpleSerializer,
        "password": UpdatePasswordSerializer,
    }

    @extend_schema(
        methods=["DELETE"],
        description="Delete the current user's account.",
        responses={204: None},
    )
    @extend_schema(
        methods=["PUT"],
        description="Update the current user's account.",
        responses={200: UserSimpleSerializer},
    )
    @extend_schema(
        methods=["GET"],
        description="Get the current user's account.",
        responses={200: UserSimpleSerializer, 401: None},
    )
    @action(detail=False, methods=["get", "put", "delete"])
    def account(self, request: Request) -> Response:
        """Handle account operations: GET, PUT, DELETE."""
        if request.method == "GET":
            # Check if user is authenticated
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Not authenticated"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            # Fetch the user data
            serializer = self.get_serializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == "PUT":
            # Require authentication for PUT
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication required"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            # Update the user
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == "DELETE":
            # Require authentication for DELETE
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication required"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            # Delete the current user
            user = request.user
            logout(request)
            user.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        return Response(None, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["put"])
    def password(self, request: Request) -> Response:
        # Debug: print the received data
        print(f"DEBUG: Received data: {request.data}")
        print(f"DEBUG: User: {request.user}")
        
        serializer = self.get_serializer(instance=request.user, data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            update_session_auth_hash(request, user)
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        else:
            # Debug: print validation errors
            print(f"DEBUG: Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)