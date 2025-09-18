// File: src/router/Routes.tsx

import { memo, Suspense, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { useAppConfig, useCheckAuth, useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { LoadingRing } from "@/components/ui";
import { useUpdateMetadata } from "./hooks";
import { routeConfigMap } from "./routeConfig";

export const Routes = memo(() => {
  const [location] = useLocation();
  const { isPending: isAppConfigPending, isError: isAppConfigError } = useAppConfig();
  const { data: user, isPending: isUserPending, isError: isUserError } = useSelf();
  useUpdateMetadata();
  useCheckAuth();

  // Check if we're on a public route
  const publicPaths = ['/login', '/password-reset', '/password-reset-confirm'];
  const isPublicRoute = publicPaths.some(path => location.startsWith(path));

  // Don't block on loading for public routes
  const isLoading = !isPublicRoute && (isAppConfigPending || isUserPending);
  const isError = !isPublicRoute && (isAppConfigError || isUserError);
  const isAuthenticated = !!user;

  const routes = useMemo(
    () =>
      Object.values(routeConfigMap)
        .filter(() => {
          // Allow access to all routes - don't filter based on authentication
          // The individual components can handle their own auth logic if needed
          return true;
        })
        .map((route) => (
          <Route key={route.key} path={route.path}>
            <Suspense fallback={<LoadingRing />}>
              <route.component />
            </Suspense>
          </Route>
        )),
    [isAuthenticated],
  );

  const defaultRoute = isAuthenticated
    ? routeConfigMap.homepage
    : routeConfigMap.login;

  // For public routes with errors, don't show error page
  if (isError && !isPublicRoute) {
    return (
      <Main dataTestId="error-page" className="text-center">
        <h1>Something went wrong</h1>
        <p>Please try again later.</p>
      </Main>
    );
  }

  // For public routes, don't show loading screen
  if (isLoading && !isPublicRoute) {
    return (
      <Main dataTestId="loading" className="text-center">
        <LoadingRing />
      </Main>
    );
  }

  return (
    <Switch>
      {routes}
      <Route>
        <Redirect to={defaultRoute.path} replace />
      </Route>
    </Switch>
  );
});