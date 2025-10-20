import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [openAuth, setOpenAuth] = useState(false);
  const [authTab, setAuthTab] = useState(1);
  const navigate = useNavigate();

  const login = (loggedUser) => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setOpenAuth(false);

    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const showAuth = (tab = 1) => {
    setAuthTab(tab);
    setOpenAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, openAuth, authTab, setOpenAuth, showAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);