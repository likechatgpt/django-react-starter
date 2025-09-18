// File: src/hooks/useLocalStorage.ts

import { useCallback, useState, useEffect } from "react";

export const useLocalStorage = <T,>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] => {
  const getInitialValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.warn(`Failed to parse localStorage value for key "${key}":`, error);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(getInitialValue());
  }, [getInitialValue]);

  const updateValue = useCallback(
    (newValue: T) => {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.warn(`Failed to set localStorage value for key "${key}":`, error);
      }
    },
    [key],
  );

  return [value, updateValue];
};