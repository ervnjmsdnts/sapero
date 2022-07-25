import jwtDecode from "jwt-decode";
import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);

  if (token !== null && userRole === null) {
    const role = jwtDecode(token).role;
    setUserRole(role);
  }

  const signIn = useCallback(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
