import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = import.meta.env.VITE_BACKEND_URL;

  // Safely load user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser && savedUser !== "undefined"
        ? JSON.parse(savedUser)
        : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  // 🔹 NEW: Token state
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Restore token on reload
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // 🔹 Login function
  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    console.log("res = ", res.data);

    // Expecting { token, user } from backend
    const { token: receivedToken, user: receivedUser } = res.data;

    // Save to localStorage
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(receivedUser));

    // Set axios header
    axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;

    setUser(receivedUser);
    setToken(receivedToken); // also update token state
  };

  // 🔹 Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
