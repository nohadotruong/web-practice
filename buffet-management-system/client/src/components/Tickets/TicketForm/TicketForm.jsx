import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import "./TicketForm.css";

export default function TicketForm({
  action,
  ticketData,
  setTicketFormOpen,
  onTicketsUpdate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ticketData) {
      setFormData({
        name: ticketData.name || "",
        price: ticketData.price || 0,
      });
    }
  }, [ticketData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name)
      newErrors.name = "Ticket name is required!";
    if (!formData.price)
      newErrors.price = "Price is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    const req = ticketData?.id
      ? axiosClient.put(`/tickets/${ticketData.id}`, {
          price: formData.price,
        })
      : axiosClient.post(`/tickets`, formData);

    try {
      await req;
      alert(
        `${
          ticketData?.id
            ? `Update Ticket ${ticketData.name}`
            : "Add ticket"
        } successfully!`
      );
      setTicketFormOpen(false);
      onTicketsUpdate();
    } catch (err) {
      console.error(err);
      const resErrors = err?.response?.data?.error;
      if (resErrors) {
        setErrors(resErrors);
      } else {
        alert(
          `${
            ticketData?.id
              ? `Update Ticket ${ticketData.name}`
              : "Add ticket"
          } failed!`
        );
      }
    }
  };

  return (
    <div className="ticket-form__container">
      <div className="ticket-form__section">
        <form onSubmit={handleSubmit}>
          <div className="form__header d-flex align-items-center mb-3">
            <h2 className="m-0 me-3">
              {action} <br /> {ticketData?.name}
            </h2>
            <button
              type="button"
              className="btn btn-secondary ms-auto"
              onClick={() => setTicketFormOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="ticket-input__section mb-3">
            {action === "Add Ticket" && (
              <div className="input__section w-100">
                <label className="ps-1">Ticket name:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-100"
                  placeholder="Name - Age group"
                />

                <div className="invalid__alert">
                  {errors.name}
                </div>
              </div>
            )}

            <div className="input__section w-100">
              <label className="ps-1">Price (VND):</label>
              <br />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-100"
                min={0}
              />

              <div className="invalid__alert">
                {errors.price}
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
                  name: ticketData?.name || "",
                  price: ticketData?.price || 0,
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
