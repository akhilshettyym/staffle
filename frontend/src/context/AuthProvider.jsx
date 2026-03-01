import { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState({
    organization: null,
    admin: null,
    employees: [],
  });

  useEffect(() => {
    const data = getLocalStorage();
    if (data) {
      setUserData(data);
    }
  }, []);

  const updateAuthData = (updatedData) => {
    setUserData(updatedData);
    setLocalStorage(updatedData);
  };

  return (
    <AuthContext.Provider value={{ ...userData, updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;