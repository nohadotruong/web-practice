import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import UserForm from "../UserForm/UserForm";

import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [isUserFormOpen, setUserFormOpen] = useState(false);
  const [action, setAction] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const fetchUsers = () => {
    if (role !== "") {
      axiosClient
        .get(`/users/by-role/${role}`)
        .then((res) => setUsers(res.data.users))
        .catch((err) => console.error("Fetch error:", err));
    } else {
      axiosClient
        .get("/users/")
        .then((res) => setUsers(res.data.users))
        .catch((err) => console.error("Fetch error:", err));
    }
  };

  const toggleUserForm = (formAction, userId = null) => {
    setAction(formAction);
    if (userId) {
      axiosClient
        .get(`/users/by-id/${userId}`)
        .then((res) => setUserData(res.data.user))
        .catch(() => setUserData(null))
        .finally(() => setUserFormOpen(true));
    } else {
      setUserData(null);
      setUserFormOpen((prev) => !prev);
    }
  };

  return (
    <div className="user-list__container m-0 p-2">
      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          toggleUserForm("Add User");
        }}
      >
        Add User
      </button>
      <div className="user-list__section">
        <table className="user-list table table-hover text-center m-0 p-0 align-middle">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col">
                Role{" "}
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                </select>
              </th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.username}</td>
                <td>{item.fullname}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    title="View"
                    onClick={() =>
                      toggleUserForm(
                        `User ${item.id}: ${item.fullname}`,
                        item.id
                      )
                    }
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUserFormOpen && (
        <UserForm
          action={action}
          userData={userData}
          setUserData={setUserData}
          setUserFormOpen={setUserFormOpen}
          onUsersUpdated={fetchUsers}
        />
      )}
    </div>
  );
}
