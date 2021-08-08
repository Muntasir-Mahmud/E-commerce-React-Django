from django.urls import path

from . import views

app_name = 'product'

urlpatterns = [
    path('products/', views.get_products, name='get-products'),
    path('product/<str:pk>/', views.get_product, name='get-a-product'),
    path('product/<str:pk>/reviews/', views.create_product_review, name='create-review'),
]
