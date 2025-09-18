// File: src/components/ui/LoadingRing.tsx

import type React from "react";
import { memo } from "react";

export type LoadingRingProps = {
  width?: string;
};

export const LoadingRing: React.FC<LoadingRingProps> = memo(({ width = "60px" }) => {
  return (
    <span
      data-testid="loading-ring"
      className="loading loading-ring mx-auto"
      style={{ width }}
    />
  );
});