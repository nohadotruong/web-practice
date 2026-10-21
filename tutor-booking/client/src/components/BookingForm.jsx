// src/components/BookingForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookingForm() {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users?role=student")
      .then((res) => setStudents(res.data));
    axios
      .get("http://localhost:5000/api/users?role=tutor")
      .then((res) => setTutors(res.data));
  }, []);

  const handleBooking = () => {
    axios
      .post("http://localhost:5000/api/bookings", {
        tutor_id: selectedTutor,
        student_id: selectedStudent,
        time,
      })
      .then(() => alert("Đặt lịch thành công!"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Đặt lịch học</h2>
      <div>
        <label>Sinh viên:</label>
        <select
          value={selectedStudent}
          onChange={(e) =>
            setSelectedStudent(e.target.value)
          }
        >
          <option>-- Chọn sinh viên --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullname}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Gia sư:</label>
        <select
          value={selectedTutor}
          onChange={(e) => setSelectedTutor(e.target.value)}
        >
          <option>-- Chọn gia sư --</option>
          {tutors.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullname}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Thời gian:</label>
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={handleBooking}>
        Xác nhận đặt lịch
      </button>
    </div>
  );
}
