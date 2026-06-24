import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../Services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      setUser({
        name: data.name || "",
        email: data.email || email,
        role: data.role || "Customer",
      });
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (formData) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const data = await registerUser(formData);
      return data;
    } catch (error) {
      setAuthError(error.response?.data || "Registration failed" );
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        authError,
        isAuthenticated,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
