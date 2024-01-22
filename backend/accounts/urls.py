from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import CadastrarAPIView, UserDetailAPIView, UserUpdateAPIView, SearchUserAPIView, SearchUsersAPIView



urlpatterns = [
    path("cadastrar/", CadastrarAPIView.as_view(), name="cadastrar"),
    path("user-detail/", UserDetailAPIView.as_view(), name="user-detail"),
    path("user-detail/<str:username>/", SearchUserAPIView.as_view(), name="user-detail"),
    path("user-detail/search/<str:username>/", SearchUsersAPIView.as_view(), name="users-detail"),
    # path("user-detail/<int:pk>/", UserDetailAPIView.as_view(), name="user-detail"),

    path("user-update/", UserUpdateAPIView.as_view(), name="user-update"),
    
    # JWT
    path(
        "token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),  # Fazer login
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
