import React, { createContext, useState } from "react";
import { API } from "../../global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log(data.user);
        const id = data.user._id;
        window.location.href = `/api/me/${id}`;
        return data.user;
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("Error occurred during login:", error);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/api/login";
  };

  const authContextValue = {
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
