// File: src/hooks/useApi.ts
import { useState, useEffect } from 'react';
import type { 
  Download, 
  Product, 
  ProductStats, 
  PriceRange, 
  ApiHookReturn, 
  ApiOptions 
} from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Generic API hook with TypeScript
export const useApi = <T>(endpoint: string, options: ApiOptions = {}): ApiHookReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Downloads API hooks
export const useDownloads = (): ApiHookReturn<Download[]> => {
  return useApi<Download[]>('/downloads/');
};

export const usePopularDownloads = (): ApiHookReturn<Download[]> => {
  return useApi<Download[]>('/downloads/popular/');
};

export const useRecentDownloads = (): ApiHookReturn<Download[]> => {
  return useApi<Download[]>('/downloads/recent/');
};

// Products API hooks
export const useProducts = (searchParams: string = ''): ApiHookReturn<Product[]> => {
  return useApi<Product[]>(`/products/${searchParams}`);
};

export const useFeaturedProducts = (): ApiHookReturn<Product[]> => {
  return useApi<Product[]>('/products/featured/');
};

export const useProductStats = (): ApiHookReturn<ProductStats> => {
  return useApi<ProductStats>('/products/stats/');
};

export const usePriceRange = (): ApiHookReturn<PriceRange> => {
  return useApi<PriceRange>('/products/price_range/');
};

// Utility function for downloading files
export const downloadFile = async (downloadId: number): Promise<boolean> => {
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
    link.download = filename || `download_${downloadId}`;
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