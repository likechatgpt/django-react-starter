// File: src/router/routeConfig.ts

import { type HomeRouteKey, homeRoutes } from "../features/home/routes";
import { type LoginRouteKey, loginRoutes } from "../features/login/routes";
import {
  type SettingsRouteKey,
  settingsRoutes,
} from "../features/settings/routes";
// Import your page components directly
import DownloadsPage from "../pages/DownloadsPage";
import ProductsPage from "../pages/ProductsPage";

export type RouteKey = HomeRouteKey | LoginRouteKey | SettingsRouteKey | "downloads" | "products";
export type AuthAccess = "public" | "private" | "public-only";

export type RouteConfig = {
  path: string;
  component: React.ComponentType;
  key: RouteKey;
  authAccess: AuthAccess;
};

export type RouteConfigMap = Record<RouteKey, RouteConfig>;

export const routeConfigMap: RouteConfigMap = {
  ...homeRoutes,
  ...loginRoutes,
  ...settingsRoutes,
  // Add your new routes directly here
  downloads: {
    path: "/downloads",
    component: DownloadsPage,
    key: "downloads",
    authAccess: "private",
  },
  products: {
    path: "/products",
    component: ProductsPage,
    key: "products", 
    authAccess: "private",
  },
};

export const pathToRoute: Record<string, RouteConfig> = Object.values(
  routeConfigMap,
).reduce(
  (acc, route) => {
    acc[route.path] = route;
    return acc;
  },
  {} as Record<string, RouteConfig>,
);