from django.urls import path

from . import views

app_name = 'order'

urlpatterns = [
    path('order/add/', views.add_order_items, name='add-order'),
    # path('order/add/', views.add_order_items, name='add-order'),
]
