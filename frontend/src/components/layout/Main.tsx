// File: src/components/layout/Main.tsx
import type React from "react";
import { useMemo } from "react";
import { useLocation } from "wouter";
import { FadeIn } from "../ui";
import { NavBar } from "./NavBar";

export type MainProps = {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
  showNavBar?: boolean;
};

const NAVBAR_HEIGHT = 64;

export const Main: React.FC<MainProps> = ({ children, className, dataTestId, showNavBar }) => {
  const [location] = useLocation();
  
  // Determine if we should show the navbar based on route
  const publicRoutesWithoutNav = ['/login', '/password-reset', '/password-reset-confirm'];
  const shouldHideNavBar = publicRoutesWithoutNav.some(route => 
    location.startsWith(route)
  );
  
  // Override showNavBar if we're on a public route
  const actualShowNavBar = shouldHideNavBar ? false : (showNavBar ?? true);
  
  const style = useMemo(() => {
    return actualShowNavBar
      ? {
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          marginTop: `${NAVBAR_HEIGHT}px`,
        }
      : { minHeight: "100vh" };
  }, [actualShowNavBar]);

  return (
    <main
      className={`hero w-full ${className || ""}`}
      data-testid={dataTestId}
      style={style}
    >
      {actualShowNavBar && <NavBar />}
      <div className="hero-content w-full">
        <div className="max-w-6xl w-full ">
          <FadeIn>{children}</FadeIn>
        </div>
      </div>
    </main>
  );
};