import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange } from "../api/firebase";

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const contextValue = {
    user,
    isLoggedIn: !!user,
  };

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ ...contextValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
