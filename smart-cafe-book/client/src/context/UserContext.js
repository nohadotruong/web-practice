"use client";

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  function fetchUser() {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUserInfo(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
