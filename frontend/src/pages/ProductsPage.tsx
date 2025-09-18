// File: src/pages/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { useProducts, useFeaturedProducts, useProductStats, usePriceRange } from '../hooks/useApi';
import ProductCard from '../components/ProductCard';
import type { Product, PriceRangeFilter, TabData } from '../types/api';

type TabId = 'all' | 'featured';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Build query string for API
  const buildQueryString = (): string => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (priceRange.min) params.append('min_price', priceRange.min);
    if (priceRange.max) params.append('max_price', priceRange.max);
    if (sortBy) params.append('ordering', sortBy);
    return params.toString() ? `?${params.toString()}` : '';
  };

  // API calls
  const { data: allProducts, loading: allLoading, error: allError } = useProducts(buildQueryString());
  const { data: featuredProducts, loading: featuredLoading, error: featuredError } = useFeaturedProducts();
  const { data: productStats, loading: statsLoading } = useProductStats();
  const { data: priceRangeData, loading: rangeLoading } = usePriceRange();

  const tabs: TabData<Product>[] = [
    { id: 'all', label: 'All Products', data: allProducts, loading: allLoading, error: allError },
    { id: 'featured', label: 'Featured', data: featuredProducts, loading: featuredLoading, error: featuredError }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  // Reset filters when switching tabs
  useEffect(() => {
    if (activeTab === 'featured') {
      setSearchQuery('');
      setPriceRange({ min: '', max: '' });
      setSortBy('');
    }
  }, [activeTab]);

  const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-12">
      <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-2">
        <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );

  const EmptyState: React.FC = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 8a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Products Found</h3>
      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
    </div>
  );

  const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">{product.price_display}</span>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-semibold">Product ID:</span> {product.id}
            </div>
            <div>
              <span className="font-semibold">Price:</span> ${product.price}
            </div>
            <div>
              <span className="font-semibold">Created:</span> {new Date(product.created_at).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Updated:</span> {new Date(product.updated_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const clearFilters = (): void => {
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
  };

  const hasFilters = searchQuery || priceRange.min || priceRange.max || sortBy;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Explore our product catalog with advanced search and filtering.</p>
      </div>

      {/* Stats Cards */}
      {productStats && !statsLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{productStats.total_products}</div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-green-600">${productStats.average_price}</div>
            <div className="text-sm text-gray-500">Average Price</div>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-purple-600">${productStats.min_price}</div>
            <div className="text-sm text-gray-500">Lowest Price</div>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-red-600">${productStats.max_price}</div>
            <div className="text-sm text-gray-500">Highest Price</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.data && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {Array.isArray(tab.data) ? tab.data.length : 0}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters (only show for 'all' tab) */}
      {activeTab === 'all' && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                placeholder="999999.99"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Default</option>
                <option value="name">Name A-Z</option>
                <option value="-name">Name Z-A</option>
                <option value="price">Price Low to High</option>
                <option value="-price">Price High to Low</option>
                <option value="created_at">Oldest First</option>
                <option value="-created_at">Newest First</option>
              </select>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {hasFilters && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[400px]">
        {currentTab?.loading && <LoadingSpinner />}
        
        {currentTab?.error && <ErrorMessage message={currentTab.error} />}
        
        {!currentTab?.loading && !currentTab?.error && (
          <>
            {!currentTab?.data || currentTab.data.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTab.data.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Price Range Info */}
      {priceRangeData && !rangeLoading && activeTab === 'all' && (
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Price Range Information</h3>
          <p className="text-blue-600">
            Available products range from <strong>${priceRangeData.min_price}</strong> to <strong>${priceRangeData.max_price}</strong>
            {priceRangeData.count > 0 && (
              <span> across <strong>{priceRangeData.count}</strong> products</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;