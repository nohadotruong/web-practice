import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchToken();
  }, []);

  function fetchToken() {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUserInfo(null);
      }
    }
  }

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, fetchToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
