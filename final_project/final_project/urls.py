"""
URL configuration for final_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django_app.views import GetGameView, delete_game



urlpatterns = [
    path('admin/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path("api-auth/", include("rest_framework.urls")),
    path("api_v1/", include("api.urls")),
    path("collection/", GetGameView.as_view(), name="GetGameView"),
    path("collection/<int:game_id>/", delete_game, name="delete_game"),
    path('accounts/', include("allauth.urls")),
    path('auth/', include("accounts.urls")),
    # path("add-game/", add_game, name="add_game"),


    # path('api/auth/', include('authentication.urls')),  
    # path('/dj-rest-auth/login/', get_login)

]
