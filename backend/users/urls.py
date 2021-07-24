from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('users/', views.get_users, name='users'),
    path('users/login/', views.MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.get_user_profile, name='user_profile'),
    path('users/profile/update/', views.update_user_profile, name='user_profile_update'),
    path('users/register/', views.register_user, name='user_register'),
]
