// File: src/api/utils.ts
import Cookies from "js-cookie";
import {
  API_ROOT_URL,
  API_PREFIX,
  CSRF_TOKEN_COOKIE_NAME,
  CSRF_TOKEN_HEADER_NAME,
} from "@/api/config";

type JsonLike = Record<string, unknown> | unknown;

type FetchOptions = {
  data?: JsonLike; // JSON body
  formData?: FormData; // multipart/form-data body
  method?: string; // GET/POST/PUT/PATCH/DELETE (default GET)
  init?: RequestInit; // extra fetch options/overrides
};

// Ensure the path begins with a single leading slash
const withLeadingSlash = (path: string) => (path.startsWith("/") ? path : `/${path}`);

// Normalize so /api/v1 is not double-prefixed.
// Accepts absolute URLs (returned as-is) or API paths (with or without /api/v1).
const resolveUrl = (pathOrUrl: string): string => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl; // absolute URL
  }
  const prefix = API_PREFIX.replace(/^\//, ""); // e.g. "api/v1"
  let p = withLeadingSlash(pathOrUrl);
  // If caller already included the API prefix, strip it before joining.
  const prefixPattern = new RegExp(`^/${prefix}(?=/|$)`, "i");
  if (prefixPattern.test(p)) {
    p = p.replace(prefixPattern, "");
    p = withLeadingSlash(p);
  }
  return `${API_ROOT_URL}${p}`;
};

// Global promise to ensure CSRF token is fetched only once
let csrfTokenPromise: Promise<string | null> | null = null;

// Function to fetch CSRF token from Django
const fetchCSRFToken = async (): Promise<string | null> => {
  if (csrfTokenPromise) {
    return csrfTokenPromise;
  }

  csrfTokenPromise = (async () => {
    try {
      // Try multiple possible CSRF cookie names
      const possibleNames = [
        'csrftoken',
        'django_react_starter-csrftoken',
        'django-csrftoken',
        CSRF_TOKEN_COOKIE_NAME
      ];

      let token = null;
      for (const name of possibleNames) {
        token = Cookies.get(name);
        if (token) {
          console.log(`CSRF Token found with name: ${name}`);
          break;
        }
      }

      if (!token) {
        console.warn('CSRF token not found in cookies, making request to get it');
        // Make a GET request to a Django endpoint to ensure CSRF token is set
        const response = await fetch(`${API_ROOT_URL}/auth/csrf/`, {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          // Try to get token from response if it's JSON
          try {
            const data = await response.json();
            if (data.csrfToken) {
              token = data.csrfToken;
              console.log('CSRF Token received from API response');
            }
          } catch (e) {
            // Not JSON, that's okay
          }

          // Try cookies again after the request
          if (!token) {
            for (const name of possibleNames) {
              token = Cookies.get(name);
              if (token) {
                console.log(`CSRF Token found in cookie after request: ${name}`);
                break;
              }
            }
          }
        } else {
          console.warn('Failed to get CSRF token:', response.status, response.statusText);
        }
      }

      return token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  })();

  return csrfTokenPromise;
};

// Reset CSRF token promise to allow refetch
const resetCSRFTokenPromise = () => {
  csrfTokenPromise = null;
};

// Export as getCsrfToken to match the import in useLogin.ts
export { fetchCSRFToken as getCsrfToken };

/**
 * Core API fetcher that prefixes requests with API_ROOT_URL exactly once.
 * Prefer passing API paths like "/users" or "users/1".
 * Absolute URLs are honored unchanged.
 */
export const apiFetch = async (
  path: string,
  { data, formData, method = "GET", init }: FetchOptions = {},
): Promise<any> => {
  // For state-changing requests, ensure we have a CSRF token
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
  let csrfToken = null;

  if (isStateChanging) {
    // First, try to get token from cookies
    const possibleNames = [
      'csrftoken',
      'django_react_starter-csrftoken', 
      'django-csrftoken',
      CSRF_TOKEN_COOKIE_NAME
    ];

    for (const name of possibleNames) {
      csrfToken = Cookies.get(name);
      if (csrfToken) {
        console.log(`Using CSRF token from cookie: ${name}`);
        break;
      }
    }

    // If no CSRF token found, try to fetch it
    if (!csrfToken) {
      console.log('No CSRF token found in cookies, attempting to fetch one...');
      csrfToken = await fetchCSRFToken();
      if (!csrfToken) {
        console.warn('Failed to fetch CSRF token for', method, 'request to', path);
        // Don't fail the request, let the backend handle the missing token
      }
    }
  }

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  headers.set("Accept", "application/json");

  // Always include CSRF token for state-changing requests if available
  if (csrfToken && isStateChanging) {
    headers.set(CSRF_TOKEN_HEADER_NAME, csrfToken);
    console.log(`Set CSRF header ${CSRF_TOKEN_HEADER_NAME}`);
  }

  if (data !== undefined && !formData) {
    headers.set("Content-Type", "application/json");
  }

  const request: RequestInit = {
    credentials: "include",
    redirect: "follow",
    ...init,
    method: method.toUpperCase(),
    headers,
  };

  if (formData) {
    request.body = formData;
  } else if (data !== undefined) {
    request.body = JSON.stringify(data);
    console.log(`Making ${method} request to ${path} with data:`, data);
  }

  const url = resolveUrl(path);
  console.log(`API Request: ${method} ${url}`);

  const response = await fetch(url, request);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (response.ok) {
    return isJson ? response.json() : {};
  }

  // Handle 401 errors specifically for logout
  if (response.status === 401 && path.includes('/auth/logout/')) {
    console.log('Logout 401 - user may already be logged out, treating as success');
    return {};
  }

  // If we get 403 (CSRF failure), reset the token promise to allow refetch
  if (response.status === 403) {
    console.log('Received 403 Forbidden, resetting CSRF token for next request');
    resetCSRFTokenPromise();
  }

  let errorResponse = {};
  if (isJson) {
    try {
      errorResponse = await response.json();
    } catch (e) {
      console.warn('Failed to parse error response as JSON');
    }
  } else {
    try {
      const text = await response.text();
      if (text) {
        errorResponse = { message: text };
      }
    } catch (e) {
      console.warn('Failed to read error response text');
    }
  }

  console.error('API Error:', {
    status: response.status,
    statusText: response.statusText,
    url: url,
    method: method,
    errorResponse: errorResponse
  });

  const errorPayload = {
    status: response.status,
    text: response.statusText,
    errors: errorResponse,
  };

  return Promise.reject(errorPayload);
};

// Backward-compat named export expected by older code (e.g., useAppConfig.ts).
// It accepts either a full URL or an API path. Internally, it delegates to apiFetch.
export const performRequest = async (
  urlOrPath: string,
  opts: FetchOptions,
): Promise<any> => apiFetch(urlOrPath, opts);

// Convenience helpers that never re-append /api/v1
export const apiGet = (path: string, init?: RequestInit) =>
  apiFetch(path, { method: "GET", init });

export const apiPost = (path: string, data?: JsonLike, init?: RequestInit) =>
  apiFetch(path, { method: "POST", data, init });

export const apiPut = (path: string, data?: JsonLike, init?: RequestInit) =>
  apiFetch(path, { method: "PUT", data, init });

export const apiPatch = (path: string, data?: JsonLike, init?: RequestInit) =>
  apiFetch(path, { method: "PATCH", data, init });

export const apiDelete = (path: string, init?: RequestInit) =>
  apiFetch(path, { method: "DELETE", init });

export const uploadFormData = (path: string, formData: FormData, init?: RequestInit) =>
  apiFetch(path, { method: "POST", formData, init });