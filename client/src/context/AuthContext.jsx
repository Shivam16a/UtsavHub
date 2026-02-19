/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          // Defer setUser to next tick to avoid warning
          setTimeout(() => setUser(JSON.parse(storedUser)), 0);
        }

        const res = await fetch(`${API}/api/users/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.username) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        }
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    await fetch(`${API}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading,API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
