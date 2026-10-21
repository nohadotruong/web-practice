// src/components/SubjectList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subjects")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Danh sách Môn học</h2>
      <ul>
        {subjects.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
