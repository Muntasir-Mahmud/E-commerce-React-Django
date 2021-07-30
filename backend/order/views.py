from product.models import Product
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def add_order_items(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            tax_price=data['taxPrice'],
            shipping_price=data['shippingPrice'],
            total_price=data['totalPrice'],
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postal_code=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shipping_price=data['shippingAddress']['shippingPrice'],
        )

        # (3) Create order items and set order to orderItem relationship
        for item in orderItems:
            product = Product.objects.get(id=item['productId'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=item['quantity'],
                price=item['price'],
                image= product.image.url,

            )
        
            # (4) Update Stock
            product.count_in_stock -= item.quantity
            product.save()

    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)