import { createContext, useContext, useEffect, useState } from "react";
import { login as loginUser, logout as logoutUser, isAuthenticated } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setAuthenticated(true);
    return data;
  };

  const logout = () => {
    logoutUser();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}