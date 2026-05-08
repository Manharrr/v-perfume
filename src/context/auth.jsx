import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

import { authService } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return authService.getCurrentUser();
  });

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
