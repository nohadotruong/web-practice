"use client";

import withAuth from "@/hoc/withAuth";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

function AdminDashboard() {
  const { userInfo } = useContext(UserContext);

  return (
    <div>
      {userInfo
        ? `Chào mừng admin ${userInfo.username}`
        : "Đang tải..."}
    </div>
  );
}

export default withAuth(AdminDashboard, 2);
