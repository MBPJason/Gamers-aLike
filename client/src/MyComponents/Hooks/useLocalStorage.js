import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PREFIX = "gamers-alike-";
const auth = Cookies.get("__AUTH");

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null || undefined) {
      return JSON.parse(jsonValue);
    } else if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!auth) {
      return;
    } else {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
