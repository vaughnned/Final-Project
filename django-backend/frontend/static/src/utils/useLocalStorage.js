import { useState, useEffect } from "react";

const useLocalStorage = (key, value = null) => {
  const [state, setState] = useState(value);
  const localStorageValue = localStorage.getItem(key);

  useEffect(() => {
    try {
      if (localStorageValue) {
        setState(JSON.parse(localStorageValue));
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem(key);
    }
  }, []);

  const update = (to) => {
    setState(to);
    localStorage.setItem(key, JSON.stringify(to));
  };

  const remove = () => {
    setState(null);
    localStorage.removeItem(key);
  };

  return [state, update, remove];
};
export default useLocalStorage;
