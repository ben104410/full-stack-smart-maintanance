from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from .models import User
from .serializers import UserSerializer, RegisterSerializer, EmailTokenObtainPairSerializer
import uuid
from utils.email_service import send_notification
from django.contrib.auth.hashers import make_password


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ListUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class UpdateUserRoleView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def request_password_reset(request):
    email = request.data.get("email")
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Email not found"}, status=404)

    token = str(uuid.uuid4())
    user.reset_token = token
    user.save()

    reset_link = f"http://localhost:5173/reset-password/{token}/"
    send_notification(
        user.email,
        "Password Reset",
        f"Click here to reset your password: {reset_link}"
    )

    return Response({"message": "Reset link sent to email."})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def reset_password(request):
    token = request.data.get("token")
    new_password = request.data.get("password")

    try:
        user = User.objects.get(reset_token=token)
    except User.DoesNotExist:
        return Response({"error": "Invalid token"}, status=404)

    user.password = make_password(new_password)
    user.reset_token = None
    user.save()

    return Response({"message": "Password reset successful!"})
