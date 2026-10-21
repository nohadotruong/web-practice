import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

import "./InvoiceDetail.css";

export default function InvoiceDetail({
  invoiceData,
  setInvoiceData,
  ticketList,
}) {
  const [tickets, setTickets] = useState([]);

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

  const sumSubTotal = tickets.reduce((sum, ticket) => {
    const ticketInfo = ticketList.find(
      (t) => t.ticket_id === ticket.id
    );
    if (!ticketInfo) return sum;
    return sum + ticket.price * ticketInfo.quantity;
  }, 0);

  useEffect(() => {
    if (sumSubTotal > 0) {
      const vatAmount =
        (sumSubTotal * invoiceData.vat_percent) / 100;
      const totalVal = sumSubTotal + vatAmount;

      setInvoiceData((prev) => ({
        ...prev,
        subtotal: sumSubTotal,
        vat_amount: vatAmount,
        total: totalVal,
      }));
    }
  }, [ticketList, sumSubTotal]);

  return (
    <div className="payment-detail__section row m-0 p-2 mb-3">
      <h2 className="m-0 mb-2 text-center">
        Invoice Details
      </h2>

      <div className="detail__section">
        <table className="table align-middle text-center mb-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Table</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td>{invoiceData.date}</td>
              <td>{invoiceData.start_time}</td>
              <td>{invoiceData.end_time}</td>
              <td>{invoiceData.table_id}</td>
            </tr>
          </tbody>
        </table>
        <table className="table align-middle text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>
                Unit Price <br />
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
                {invoiceData.total.toLocaleString("vi-VN")}
              </th>
            </tr>
            {invoiceData.status === "Paid" && (
              <tr>
                <th colSpan={3}></th>
                <th>Amount Paid:</th>
                <th>
                  {invoiceData.amount_paid.toLocaleString(
                    "vi-VN"
                  )}
                </th>
              </tr>
            )}

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
  );
}
