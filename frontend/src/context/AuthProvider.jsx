// import { createContext, useEffect, useState } from "react";
// import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {

//   const [userData, setUserData] = useState({
//     organization: null,
//     admin: null,
//     employees: [],
//   });

//   useEffect(() => {
//     const data = getLocalStorage();
//     if (data) {
//       setUserData(data);
//     }
//   }, []);

//   const updateAuthData = (updatedData) => {
//     setUserData(updatedData);
//     setLocalStorage(updatedData);
//   };

//   return (
//     <AuthContext.Provider value={{ ...userData, updateAuthData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("tb_token") || null;
    const user = JSON.parse(localStorage.getItem("tb_user") || "null");
    return { token, user };
  });

  useEffect(() => {
    if (auth?.token) localStorage.setItem("tb_token", auth.token);
    else localStorage.removeItem("tb_token");
    if (auth?.user) localStorage.setItem("tb_user", JSON.stringify(auth.user));
    else localStorage.removeItem("tb_user");
  }, [auth]);


  // localStorage.clear()

  // const logout = async () => {
  //   // call backend logout endpoint to clear cookie
  //   try {
  //     await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"}/api/auth/logout`, {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //   } catch (e) {
  //     // ignore network errors on logout
  //   }
  //   setAuth({ token: null, user: null });
  // };

  return (
    // logout
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}