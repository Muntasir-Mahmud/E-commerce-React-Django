from django.urls import path

from . import views

app_name = 'order'

urlpatterns = [
    path('order/add/', views.add_order_items, name='add-order'),
    path('order/<str:pk>/', views.get_order_by_id, name='user-order'),
    path('order/<str:pk>/pay/', views.update_order_to_paid, name='pay'),
]
