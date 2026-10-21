import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/Layouts/HeaderBar/HeaderBar";
import TabBar from "../../components/Layouts/TabBar/TabBar";
import TableList from "../../components/Tables/TableList/TableList";
import TicketList from "../../components/Tickets/TicketList/TicketList";
import InvoiceList from "../../components/Invoices/InvoiceList/InvoiceList";
import Revenue from "../../components/Revenues/Revenue";
import UserList from "../../components/Users/UserList/UserList";

import "./Home.css";

export default function Home() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("currentTab") || "tables"
  );

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      <div className="home__container m-0 p-0">
        <HeaderBar user={user} />
        <div className="home__content p-3">
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={user.role}
          />
          {activeTab === "tables" && (
            <TableList userRole={user.role} />
          )}

          {activeTab === "tickets" && (
            <TicketList userRole={user.role} />
          )}

          {activeTab === "invoices" && (
            <InvoiceList userRole={user.role} />
          )}

          {activeTab === "revenue" && <Revenue />}

          {activeTab === "users" && <UserList />}
        </div>
      </div>
    </div>
  );
}
