// src/components/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users?role=tutor")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Danh sách Gia sư</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.fullname} - 📞 {u.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
