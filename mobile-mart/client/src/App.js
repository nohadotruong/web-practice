import React from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import AddProduct from "./components/AddProduct";

export default function App() {
  return (
    <div>
      <SignInForm />
      <SignUpForm />
      <AddProduct />
    </div>
  );
}
