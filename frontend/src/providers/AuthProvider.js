"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loginFlag = localStorage.getItem("isLogin") === "true";
    const savedToken = localStorage.getItem("token");
    setIsLogin(loginFlag);
    setToken(savedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, token, setIsLogin, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
