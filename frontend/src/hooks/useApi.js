// File: src/hooks/useApi.js
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Generic API hook
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Downloads API hooks
export const useDownloads = () => {
  return useApi('/downloads/');
};

export const usePopularDownloads = () => {
  return useApi('/downloads/popular/');
};

export const useRecentDownloads = () => {
  return useApi('/downloads/recent/');
};

// Products API hooks
export const useProducts = (searchParams = '') => {
  return useApi(`/products/${searchParams}`);
};

export const useFeaturedProducts = () => {
  return useApi('/products/featured/');
};

export const useProductStats = () => {
  return useApi('/products/stats/');
};

export const usePriceRange = () => {
  return useApi('/products/price_range/');
};

// Utility function for downloading files
export const downloadFile = async (downloadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/downloads/${downloadId}/download_file/`);
    
    if (!response.ok) {
      throw new Error('Download failed');
    }

    // Get filename from Content-Disposition header
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : `download_${downloadId}`;

    // Create blob and download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
};