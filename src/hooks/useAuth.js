import { useState } from "react";

const STORAGE_KEY = "baja_pw_hash";

async function hashPassword(plaintext) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(plaintext)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isFirstVisit = localStorage.getItem(STORAGE_KEY) === null;

  const setPassword = async (plaintext) => {
    const hex = await hashPassword(plaintext);
    localStorage.setItem(STORAGE_KEY, hex);
    setIsAuthenticated(true);
  };

  const login = async (plaintext) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const hex = await hashPassword(plaintext);
    if (hex === stored) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, isFirstVisit, setPassword, login, logout };
}
