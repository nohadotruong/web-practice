import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import "./TableForm.css";

export default function TableForm({
  action,
  userRole,
  tableData,
  setTableFormOpen,
  onTablesUpdate,
}) {
  const [formData, setFormData] = useState({
    seating_cap: 0,
    status: "Available",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tableData) {
      setFormData({
        seating_cap: tableData.seating_cap || 0,
        status: tableData.status || "Available",
      });
    }
  }, [tableData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.seating_cap)
      newErrors.seating_cap =
        "Seating capacity is required!";
    if (!formData.status)
      newErrors.status = "Status is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    const req = tableData?.id
      ? axiosClient.put(`/tables/${tableData.id}`, formData)
      : axiosClient.post(`/tables`, {
          seating_cap: formData.seating_cap,
        });

    try {
      await req;
      alert(
        `${
          tableData?.id
            ? `Update Table ${tableData.id}`
            : "Add Table"
        } successfully!`
      );
      setTableFormOpen(false);
      onTablesUpdate();
    } catch (err) {
      console.error(err);
      const resErrors = err?.response?.data?.error;
      if (resErrors) {
        setErrors(resErrors);
      } else {
        alert(
          `${
            tableData?.id
              ? `Update Table ${tableData.id}`
              : "Add table"
          } failed!`
        );
      }
    }
  };

  return (
    <div className="table-form__container">
      <div className="table-form__section">
        <form onSubmit={handleSubmit}>
          <div className="form__header d-flex align-items-center mb-3">
            <h2 className="m-0 me-3">
              {action} {tableData?.id}
            </h2>
            <button
              type="button"
              className="btn btn-secondary ms-auto"
              onClick={() => setTableFormOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="table-input__section mb-3">
            {userRole === "Manager" && (
              <div className="input__section w-100">
                <label className="ps-1">
                  Seating capacity:
                </label>
                <select
                  name="seating_cap"
                  value={formData.seating_cap}
                  onChange={handleChange}
                  className="w-100"
                >
                  <option value={0}>-- Select --</option>
                  {[4, 6, 8].map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>
                <div className="invalid__alert">
                  {errors.seating_cap}
                </div>
              </div>
            )}

            <div className="input__section w-100">
              <label className="ps-1">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-100"
                disabled={action === "Add Table"}
              >
                {["Available", "Occupied"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="invalid__alert">
                {errors.status}
              </div>
            </div>
          </div>

          <div className="button__section d-flex m-0">
            <button
              type="submit"
              className="btn btn-success w-50 m-1"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-warning w-50 m-1"
              onClick={() =>
                setFormData({
                  seating_cap: tableData?.seating_cap || 0,
                  status: tableData?.status || "Available",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
