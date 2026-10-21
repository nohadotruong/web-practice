import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

import "./TicketList.css";
import TicketForm from "../TicketForm/TicketForm";

export default function TicketList({ userRole }) {
  const [tickets, setTickets] = useState([]);
  const [ticketData, setTicketData] = useState(null);
  const [isTicketFormOpen, setTicketFormOpen] =
    useState(false);
  const [action, setAction] = useState("");

  const toggleTicketForm = (
    formAction,
    ticketId = null
  ) => {
    setAction(formAction);
    if (ticketId) {
      axiosClient
        .get(`/tickets/by-id/${ticketId}`)
        .then((res) => setTicketData(res.data.ticket))
        .catch(() => setTicketData(null))
        .finally(() => setTicketFormOpen(true));
    } else {
      setTicketData(null);
      setTicketFormOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isTicketFormOpen
      ? "hidden"
      : "";
  }, [isTicketFormOpen]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axiosClient
      .get("/tickets/")
      .then((res) => setTickets(res.data.tickets))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleDelete = async (ticketId, name) => {
    if (!window.confirm(`Delete Ticket ${name}?`)) return;
    try {
      await axiosClient.delete(`/tickets/${ticketId}`);
      alert(`Deleted ticket ${name} successfully!`);
      fetchTickets();
    } catch {
      alert(`Delete ticket ${name} failed!`);
    }
  };

  return (
    <div className="ticket-list__container m-0 p-2">
      {userRole === "Manager" && (
        <button
          className="btn btn-primary mb-2"
          onClick={() => {
            toggleTicketForm("Add Ticket");
          }}
        >
          Add Ticket
        </button>
      )}
      <div className="ticket-list__section">
        <table className="ticket-list table table-hover text-center m-0 p-0 align-middle">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ticket name</th>
              <th scope="col">Price (VND)</th>
              {userRole === "Manager" && (
                <th scope="col">Option</th>
              )}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tickets.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>
                  {item.price.toLocaleString("vi-VN")}
                </td>
                {userRole === "Manager" && (
                  <td>
                    <button
                      className="btn btn-warning"
                      title="Edit"
                      onClick={() =>
                        toggleTicketForm(
                          "Edit Ticket",
                          item.id
                        )
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      title="Delete"
                      onClick={() =>
                        handleDelete(item.id, item.name)
                      }
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTicketFormOpen && (
        <TicketForm
          action={action}
          ticketData={ticketData}
          setTicketFormOpen={setTicketFormOpen}
          onTicketsUpdate={fetchTickets}
        />
      )}
    </div>
  );
}
