import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";

import GeneralInfoForm from "../GeneralInfoForm/GeneralInfoForm";
import TicketInfoForm from "../TicketInfoForm/TicketInfoForm";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";

import "./PaymentForm.css";

export default function PaymentForm({
  invoiceData,
  setInvoiceData,
  ticketList,
  setCheckOut,
  setInvoiceFormOpen,
  onTablesUpdated,
  onInvoicesUpdated,
}) {
  const invoiceInitial = {
    date: null,
    start_time: null,
    end_time: null,
    table_id: 0,
    note: "",
    subtotal: 0,
    vat_percent: 10,
    vat_amount: 0,
    total: 0,
    amount_paid: 0,
    status: null,
  };

  const [user, setUser] = useState({});
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [ticketList]);

  const fetchTickets = async () => {
    setTickets([]);
    for (const item of ticketList) {
      if (item.ticket_id !== 0) {
        try {
          const res = await axiosClient.get(
            `/tickets/${item.ticket_id}`
          );
          setTickets((prev) => [...prev, res.data.ticket]);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }
    }
  };

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInvoice = {
      ...invoiceData,
      status: "Paid",
    };

    setInvoiceData(updatedInvoice);

    try {
      await axiosClient.put(
        `/invoices/${invoiceData.id}`,
        updatedInvoice
      );
      await axiosClient.put(
        `/tables/update-status/${invoiceData.table_id}`,
        { status: "Available" }
      );

      alert("Check Out successfully!");
      onInvoicesUpdated?.();
      onTablesUpdated?.();
    } catch (err) {
      console.log("Check Out failed! Error: ", err);
      alert("Check Out failed!");
    }
  };

  return (
    <div className="payment__container w-100">
      <div className="payment__section container">
        <div className="payment__header d-flex align-items-center w-100 mt-3">
          <h2 className="m-0 me-auto">Check Out</h2>

          <button
            type="button"
            title="Close"
            className="btn btn-secondary d-flex"
            onClick={() => {
              setCheckOut(false);
              setInvoiceFormOpen(
                invoiceData.status === "Unpaid"
              );
            }}
          >
            <p className="d-sm-flex d-none m-0 p-0 me-2">
              Close
            </p>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="payment__body mt-2 p-2 w-100">
          <h2 className="text-center mb-3">Invoice</h2>
          <div>
            <table className="table align-middle m-0 p-0 w-100">
              <tbody className="table-group-divider">
                <tr>
                  <th>Date:</th>
                  <td colSpan={2}>{invoiceData.date}</td>
                  <th>Table:</th>
                  <td>{invoiceData.table_id}</td>
                </tr>
                <tr>
                  <th>Start time:</th>
                  <td>{invoiceData.start_time}</td>
                  <td></td>
                  <th>End time:</th>
                  <td>{invoiceData.end_time}</td>
                </tr>
                <tr>
                  <th>Cashier:</th>
                  <td colSpan={4} className="text-start">
                    {user.fullname}
                  </td>
                </tr>
                <tr>
                  <th>Note:</th>
                  <td colSpan={4}>
                    {invoiceData.note || "None"}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table text-center align-middle m-0 p-0 w-100">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Ticket</th>
                  <th>Quantity</th>
                  <th>
                    Unit Price
                    <br />
                    (VND)
                  </th>
                  <th>
                    Total <br />
                    (VND)
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {tickets.map((item, index) => {
                  const ticketInfo =
                    ticketList.find(
                      (t) => t.ticket_id === item.id
                    ) || {};
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name || ""}</td>
                      <td>{ticketInfo.quantity ?? 0}</td>
                      <td>
                        {item.price.toLocaleString("vi-VN")}
                      </td>
                      <td>
                        {(
                          item.price *
                          (ticketInfo.quantity ?? 0)
                        ).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tbody className="table-group-divider">
                <tr>
                  <th colSpan={3}></th>
                  <th>Subtotal</th>
                  <td>
                    {invoiceData.subtotal.toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                </tr>
                <tr>
                  <th colSpan={3}></th>
                  <th>VAT (10%)</th>
                  <td>
                    {invoiceData.vat_amount.toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                </tr>
                <tr>
                  <th colSpan={3}></th>
                  <th>Total</th>
                  <th>
                    {invoiceData.total.toLocaleString(
                      "vi-VN"
                    )}
                  </th>
                </tr>
                <tr>
                  <th colSpan={3}></th>
                  <th>Amount Paid:</th>
                  <th>
                    {invoiceData.amount_paid.toLocaleString(
                      "vi-VN"
                    )}
                  </th>
                </tr>
                <tr>
                  <th colSpan={3}></th>
                  <th>Status:</th>
                  <th
                    className={
                      invoiceData.status === "Paid"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {invoiceData.status}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="payment-form__section p-1 w-100">
          <form
            onSubmit={handleSubmit}
            className="w-100 mb-3"
          >
            <div className="input__section">
              <label className="ps-1" htmlFor="">
                Total (VND):
              </label>{" "}
              <br />
              <input
                className="w-100"
                type="number"
                min={1}
                name="amount_paid"
                value={invoiceData.total}
                readOnly
              />
            </div>
            <div className="input__section">
              <label className="ps-1" htmlFor="">
                Amount Paid (VND):
              </label>{" "}
              <br />
              <input
                className="w-100"
                type="number"
                min={1}
                name="amount_paid"
                value={invoiceData.amount_paid}
                onChange={handleChange}
                readOnly={invoiceData.status === "Paid"}
              />
            </div>
            <div className="input__section">
              <label className="ps-1" htmlFor="">
                Amount Returned (VND):
              </label>{" "}
              <br />
              <input
                className="w-100"
                type="text"
                value={(
                  invoiceData.amount_paid -
                  invoiceData.total
                ).toLocaleString("vi-VN")}
                readOnly
              />
            </div>
            <button
              type="submit"
              disabled={
                invoiceData.amount_paid <
                  invoiceData.total ||
                invoiceData.status === "Paid"
              }
              className="btn btn-success w-100 mt-2"
            >
              Check Out{" "}
              <i className="bi bi-check-circle"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
