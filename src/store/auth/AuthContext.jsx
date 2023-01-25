import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { authStateChanged } = useAuth();

  useEffect(() => {
    authStateChanged((user) => setUser(user));
  }, [authStateChanged]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
