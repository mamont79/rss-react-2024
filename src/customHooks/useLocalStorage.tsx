import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? storedValue : '';
    } catch (error) {
      console.log(error);
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};
