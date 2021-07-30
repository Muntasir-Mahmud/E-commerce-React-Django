from rest_framework import serializers
from users.serializers import UserSerializer

from .models import Order, OrderItem, ShippingAddress


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orders(self, obj):
        items =  obj.orderItem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data


    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingAddress, many=False)
        except:
            address = False
        return address
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many = False)
        return serializer.data


