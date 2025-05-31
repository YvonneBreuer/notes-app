import { useEffect, useState } from "react";

export function useLocalStorageSync<T>(key: string) {
  const [data, setData] = useState<T[]>(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return [];
    }

    try {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key) as string)
        : [];
    } catch (error: unknown) {
      console.error("Error reading localStorage:", error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as const;
}
