// File: src/types/api.ts

// Base types
export interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

// Download types
export interface Download extends BaseModel {
  title: string;
  description: string;
  category: string;
  category_display: string;
  file: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_size_display: string;
  is_active: boolean;
  download_count: number;
}

export interface DownloadCategory {
  code: string;
  name: string;
  count: number;
}

// Product types
export interface Product extends BaseModel {
  name: string;
  description: string;
  price: number;
  price_display: string;
}

// Stats types
export interface ProductStats {
  total_products: number;
  average_price: string;
  min_price: string;
  max_price: string;
}

export interface PriceRange {
  min_price: string;
  max_price: string;
  count: number;
}

// API hook return type
export interface ApiHookReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API hook options
export interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Navigation types
export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  path: string;
}

// Filter types
export interface PriceRangeFilter {
  min: string;
  max: string;
}

// Tab types
export interface TabData<T> {
  id: string;
  label: string;
  data: T[] | null;
  loading: boolean;
  error: string | null;
}
