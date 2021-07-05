from django.urls import path

from .views import get_products

app_name = 'product'

urlpatterns = [
    path('products/', get_products, name='get products'),
]
