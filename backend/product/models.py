from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    """
    Model of product
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    mane = models.CharField(max_length=200, null=True, blank=True)
    # image = models
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
