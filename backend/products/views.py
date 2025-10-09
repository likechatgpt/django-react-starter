# File: products/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from core.cache import cache_api_response
from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ProductCreateSerializer
        return ProductSerializer

    @cache_api_response(timeout=300, key_prefix="products:list", vary_on_params=True)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @cache_api_response(timeout=600, key_prefix="products:detail")
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-created_at')
        
        # Add search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search)
            )
        
        # Add price filtering
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price:
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass
                
        if max_price:
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass
        
        # Add ordering options
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            if ordering in ['price', '-price', 'name', '-name', 'created_at', '-created_at']:
                queryset = queryset.order_by(ordering)
        
        return queryset
    
    @cache_api_response(timeout=600, key_prefix="products:featured")
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """
        Get featured products (first 6 products for now).
        In the future, you could add a 'featured' boolean field to the Product model.
        """
        featured_products = self.get_queryset()[:6]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)

    @cache_api_response(timeout=900, key_prefix="products:price_range")
    @action(detail=False, methods=['get'])
    def price_range(self, request):
        """
        Get the price range of all products (min and max prices).
        """
        products = Product.objects.all()
        if not products.exists():
            return Response({
                'min_price': 0,
                'max_price': 0,
                'count': 0
            })

        prices = products.values_list('price', flat=True)
        return Response({
            'min_price': min(prices),
            'max_price': max(prices),
            'count': len(prices)
        })

    @cache_api_response(timeout=900, key_prefix="products:stats")
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get basic statistics about products.
        """
        total_products = Product.objects.count()
        if total_products == 0:
            return Response({
                'total_products': 0,
                'average_price': 0,
                'min_price': 0,
                'max_price': 0
            })

        prices = Product.objects.values_list('price', flat=True)
        average_price = sum(prices) / len(prices)

        return Response({
            'total_products': total_products,
            'average_price': round(average_price, 2),
            'min_price': min(prices),
            'max_price': max(prices)
        })