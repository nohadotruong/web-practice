// src/pages/HomePage.js
import React from "react";
import UserList from "../components/UserList";
import SubjectList from "../components/SubjectList";
import BookingForm from "../components/BookingForm";

export default function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Hệ thống Gia sư</h1>
      <SubjectList />
      <hr />
      <UserList />
      <hr />
      <BookingForm />
    </div>
  );
}
