from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('users/login/', views.MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.get_user_profile, name='user_profile'),
]
