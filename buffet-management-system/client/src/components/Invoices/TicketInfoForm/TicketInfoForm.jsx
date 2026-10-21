import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

import "./TicketInfoForm.css";

export default function TicketInfoForm({
  invoiceData,
  ticketList,
  setTicketList,
}) {
  const [ticketTypeList, setTicketTypeList] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/tickets/")
      .then((res) => setTicketTypeList(res.data.tickets))
      .catch((err) =>
        console.error(
          "Failed to fetch tickets! Error: ",
          err
        )
      );
  }, []);

  const addTicket = () => {
    setTicketList([
      ...ticketList,
      { ticket_id: 0, quantity: 1 },
    ]);
  };

  const removeTicket = (index) => {
    const updated = ticketList.filter(
      (_, i) => i !== index
    );
    setTicketList(updated);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...ticketList];
    updated[index][name] = Number(value);
    setTicketList(updated);
  };

  return (
    <div className="ticket-info__section m-0 mb-3 w-100">
      <div className="d-flex align-items-center row m-0 p-0 mb-2">
        <h5 className="m-0 col-sm-11 col-8">Ticket info</h5>
        <div className="d-flex align-items-end justify-content-center col-sm-1 col-4">
          <button
            className="btn btn-success ms-auto"
            type="button"
            onClick={addTicket}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      {ticketList.map((ticket, index) => (
        <div
          key={index}
          className="ticket-info__item row m-0 p-0"
        >
          <div className="input__section col-sm-7 col-12 p-2">
            <label className="ps-1" htmlFor="">
              Ticket Type:
            </label>{" "}
            <br />
            <select
              className="w-100"
              name="ticket_id"
              value={ticket.ticket_id}
              onChange={(e) => handleChange(e, index)}
              disabled={invoiceData.status === "Paid"}
            >
              <option value={0}>--- Select type ---</option>
              {ticketTypeList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name} (
                  {item.price.toLocaleString("vi-VN")} VND)
                </option>
              ))}
            </select>
          </div>
          <div className="input__section col-sm-4 col-8 p-2">
            <label className="ps-1" htmlFor="">
              Quantity:
            </label>{" "}
            <br />
            <input
              className="w-100"
              type="number"
              min={1}
              name="quantity"
              value={ticket.quantity}
              onChange={(e) => handleChange(e, index)}
              readOnly={invoiceData.status === "Paid"}
            />
          </div>
          <div className="remove__button d-flex align-items-end justify-content-center col-4 col-sm-1 pb-2">
            <button
              className="btn btn-danger m-0 ms-auto"
              type="button"
              onClick={() => removeTicket(index)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
