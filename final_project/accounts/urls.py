from django.urls import path
from .views import CustomLoginView, UserListAPIView, ProfileListAPIView, ProfileUpdateAPIView

app_name = "accounts"

urlpatterns = [
    path("user/", UserListAPIView.as_view(), name="all_profiles"),
    path("user/profile/", ProfileListAPIView.as_view(), name="all_profiles"),
    path(
        "user/profile/<int:pk>/",
        ProfileUpdateAPIView.as_view(), 
        name="profile_list",
    ),
    path('login/', CustomLoginView.as_view(), name='account_login')
]