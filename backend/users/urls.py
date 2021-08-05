from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('users/', views.get_users, name='users'),
    path('users/login/', views.MyTokenObtainView.as_view(), name='token-obtain_pair'),
    path('users/profile/', views.get_user_profile, name='user-profile'),
    path('users/profile/update/', views.update_user_profile, name='user-profile_update'),
    path('users/register/', views.register_user, name='user-register'),
    path('users/delete/<str:pk>/', views.delete_user, name='user-delete'),
    path('users/update/<str:pk>/', views.update_user, name='user-update'),
    path('users/<str:pk>/', views.get_user_by_id, name='get-user-id'),
]
  