import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

const clearPersistedState = () => {
  sessionStorage.removeItem("eventar-selected-colors");
  sessionStorage.removeItem("eventar-selected-resource");
  sessionStorage.removeItem("eventar-current-view");
  sessionStorage.removeItem("eventar-agenda-view");
};

export { clearPersistedState };
