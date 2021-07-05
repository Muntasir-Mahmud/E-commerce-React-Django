from django.urls import path

from .views import get_product, get_products

app_name = 'product'

urlpatterns = [
    path('products/', get_products, name='get products'),
    path('product/<str:pk>/', get_product, name='get a product'),
]
