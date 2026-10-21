import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import InvoiceForm from "../InvoiceForm/InvoiceForm";

import "./InvoiceList.css";

export default function InvoiceList({ userRole }) {
  const [invoices, setInvoices] = useState([]);
  const [invoiceId, setInvoiceId] = useState(0);
  const [isInvoiceFormOpen, setInvoiceFormOpen] =
    useState(false);
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    document.body.style.overflow = isInvoiceFormOpen
      ? "hidden"
      : "";
  }, [isInvoiceFormOpen]);

  useEffect(() => {
    fetchInvoices();
  }, [status]);

  const fetchInvoices = () => {
    if (status !== "All") {
      axiosClient
        .get(`/invoices/by-status/${status}`)
        .then((res) => setInvoices(res.data.invoices))
        .catch((err) => console.error("Fetch error:", err));
    } else {
      axiosClient
        .get("/invoices/")
        .then((res) => setInvoices(res.data.invoices))
        .catch((err) => console.error("Fetch error:", err));
    }
  };

  return (
    <div className="invoice-list__container m-0 p-2">
      <div className="invoice-list__section">
        <table className="invoice-list table table-hover text-center m-0 p-0 align-middle">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Table</th>
              <th scope="col">Total (VND)</th>
              <th scope="col">
                Status{" "}
                <select
                  name=""
                  id=""
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </th>
              {userRole === "Manager" && (
                <th scope="col">Option</th>
              )}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {invoices.length > 0 ? (
              invoices.map((item, index) => (
                <tr key={index}>
                  <th>{item.id}</th>
                  <td>{item.date}</td>
                  <td>{item.start_time}</td>
                  <td
                    className={
                      !item.end_time ? "text-success" : ""
                    }
                    style={
                      !item.end_time
                        ? { fontWeight: "bold" }
                        : undefined
                    }
                  >
                    {item.end_time || "In Progress"}
                  </td>
                  <td>{item.table_id}</td>
                  <td>
                    {item.total.toLocaleString("vi-VN")}
                  </td>
                  <td
                    className={
                      item.status === "Paid"
                        ? "text-success"
                        : "text-danger"
                    }
                    style={{ fontWeight: "bold" }}
                  >
                    {item.status}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      title="View"
                      onClick={() => {
                        setAction("Invoice");
                        setInvoiceId(item.id);
                        setInvoiceFormOpen(true);
                      }}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="">
                <td colSpan={8}>No data found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isInvoiceFormOpen && (
        <InvoiceForm
          action={action}
          userRole={userRole}
          invoiceId={invoiceId}
          setInvoiceFormOpen={setInvoiceFormOpen}
          onInvoicesUpdated={fetchInvoices}
        />
      )}
    </div>
  );
}
