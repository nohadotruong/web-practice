"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function withAuth(Component, requiredRole) {
  return function AuthenticationComponent(props) {
    const router = useRouter();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
      const token = localStorage.getItem("userToken");

      if (!userInfo) return;

      if (
        !token ||
        (requiredRole && userInfo.role !== requiredRole)
      ) {
        router.push("/login");
      }
    }, []);

    return <Component {...props} />;
  };
}
