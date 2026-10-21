import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

import "./UserForm.css";

export default function UserForm({
  action,
  userData,
  //   setUserData,
  setUserFormOpen,
  onUsersUpdated,
}) {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        fullname: userData.fullname || "",
        password: userData.password || "",
        role: userData.role || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username)
      newErrors.username = "Username is required!";
    if (!formData.fullname)
      newErrors.fullname = "Full Name is required!";
    if (!formData.password)
      newErrors.password = "Password is required!";
    if (!formData.role)
      newErrors.role = "Role is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    const req = userData?.id
      ? axiosClient.put(`/users/${userData.id}`, formData)
      : axiosClient.post(`/users/signup`, formData);

    try {
      await req;
      alert(
        `${
          userData?.id
            ? `Update User ${userData.id}`
            : "Add User"
        } successfully!`
      );
      setUserFormOpen(false);
      onUsersUpdated();
    } catch (err) {
      console.error(err);
      console.error(err?.response?.data?.error);

      const resErrors = err?.response?.data?.error;
      if (resErrors) {
        setErrors(resErrors);
      } else {
        alert(
          `${
            userData?.id
              ? `Update User ${userData.id}`
              : "Add user"
          } failed!`
        );
      }
    }
  };

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete User ${name}?`)) return;
    try {
      await axiosClient.delete(`/users/${userId}`);
      alert(`Deleted user ${name} successfully!`);
      onUsersUpdated();
      setUserFormOpen(false);
    } catch {
      alert(`Delete user ${name} failed!`);
    }
  };

  return (
    <div className="user-form__container w-100">
      <div className="user-form__section container">
        <div className="form__header d-flex align-items-center w-100 mt-3">
          <h2 className="m-0 me-auto">{action}</h2>

          <button
            type="button"
            title="Close"
            className="btn btn-secondary d-flex"
            onClick={() => setUserFormOpen(false)}
          >
            <p className="d-sm-flex d-none m-0 p-0 me-2">
              Close
            </p>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="m-3 w-100">
          <div className="user-input__section mb-3">
            <div className="input__section w-100">
              <label className="ps-1">Username:</label>
              <br />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-100"
                disabled={action !== "Add User"}
              />

              <div className="invalid__alert">
                {errors.username}
              </div>
            </div>

            <div className="input__section w-100">
              <label className="ps-1">Full Name:</label>
              <br />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-100"
              />

              <div className="invalid__alert">
                {errors.fullname}
              </div>
            </div>

            <div className="input__section w-100">
              <label className="ps-1">Password:</label>
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-100"
              />

              <div className="invalid__alert">
                {errors.password}
              </div>
            </div>

            <div className="input__section w-100">
              <label className="ps-1">Role:</label>
              <br />
              <select
                className="w-100"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
              </select>

              <div className="invalid__alert">
                {errors.role}
              </div>
            </div>
          </div>

          {action === "Add User" ? (
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={
                formData.username === "" ||
                formData.fullname === "" ||
                formData.role === ""
              }
            >
              Add User
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={
                  formData.username === "" ||
                  formData.fullname === "" ||
                  formData.role === ""
                }
              >
                Update User
              </button>
              <button
                type="button"
                className="btn btn-danger w-100 mt-1"
                onClick={() =>
                  handleDelete(
                    userData.id,
                    userData.fullname
                  )
                }
              >
                Delete User
              </button>
            </>
          )}

          <button
            type="button"
            className="btn btn-warning w-100 mt-1"
            onClick={() =>
              setFormData({
                username: userData?.username || "",
                fullname: userData?.fullname || "",
                password: userData?.password || "",
                role: userData?.role || "",
              })
            }
          >
            Reset
          </button>

          {/* {userRole === "Manager" && action === "User" && (
            <>
              <button
                type="button"
                className="btn btn-danger col-12 mt-1"
                onClick={handleDelete}
              >
                Delete User
              </button>
            </>
          )} */}
        </form>
      </div>
    </div>
  );
}
