// File: src/App.tsx
import React, { useState } from 'react';
import DownloadsPage from './pages/DownloadsPage';
import ProductsPage from './pages/ProductsPage';
import type { NavigationItem } from './types/api';
import './App.css';

type PageType = 'downloads' | 'products';

function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<PageType>('downloads');

  const navigation: NavigationItem[] = [
    { id: 'downloads', name: 'Downloads', icon: '📁' },
    { id: 'products', name: 'Products', icon: '🛍️' }
  ];

  const handleNavigation = (pageId: string): void => {
    setCurrentPage(pageId as PageType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🚀 Django React App
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>

            {/* API Status Indicator */}
            <div className="flex items-center">
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                API Connected
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {currentPage === 'downloads' && <DownloadsPage />}
        {currentPage === 'products' && <ProductsPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm">
              © 2025 Django React App. Built with Django REST Framework & React.
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-6 text-sm text-gray-500">
              <a 
                href="http://127.0.0.1:8000/api/v1/docs/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 transition-colors"
              >
                📚 API Documentation
              </a>
              <a 
                href="http://127.0.0.1:8000/admin/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 transition-colors"
              >
                ⚙️ Admin Panel
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;