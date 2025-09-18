// File: src/api/types.ts
export type ApiError = {
  status: number;
  errors?: Record<string, string[]>;
  text?: string;
};