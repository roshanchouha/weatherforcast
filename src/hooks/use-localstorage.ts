import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window?.localStorage.get(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("error", error);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window?.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
}
