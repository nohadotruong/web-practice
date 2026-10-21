import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";

import GeneralInfoForm from "../GeneralInfoForm/GeneralInfoForm";
import TicketInfoForm from "../TicketInfoForm/TicketInfoForm";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";
import PaymentForm from "../PaymentForm/PaymentForm";

import "./InvoiceForm.css";

export default function InvoiceForm({
  action,
  userRole,
  invoiceId,
  cITable,
  setInvoiceFormOpen,
  onTablesUpdated,
  onInvoicesUpdated,
}) {
  const invoiceInitial = {
    date: new Date().toISOString().slice(0, 10),
    start_time: new Date().toTimeString().slice(0, 5),
    end_time: null,
    table_id: cITable || 0,
    note: "",
    subtotal: 0,
    vat_percent: 10,
    vat_amount: 0,
    total: 0,
    amount_paid: 0,
    status: "Unpaid",
  };
  const [invoiceData, setInvoiceData] =
    useState(invoiceInitial);
  const [ticketList, setTicketList] = useState([]);
  const navigate = useNavigate();
  const [isCheckOut, setCheckOut] = useState(false);

  useEffect(() => {
    if (action === "Invoice") {
      const fetchInvoice = async () => {
        if (cITable) {
          try {
            const res = await axiosClient.get(
              `/invoices/by-table/${cITable}`
            );
            const invoiceId = res.data.invoice.id;

            setInvoiceData(res.data.invoice);
            const result = await axiosClient.get(
              `/invoice_details/by-invoice/${invoiceId}`
            );

            setTicketList(result.data.invoice_details);
          } catch (error) {
            console.error(
              "Get Invoice failed! Error: ",
              error
            );
          }
        } else if (invoiceId) {
          try {
            const res = await axiosClient.get(
              `/invoices/${invoiceId}`
            );
            setInvoiceData(res.data.invoice);
            const result = await axiosClient.get(
              `/invoice_details/by-invoice/${invoiceId}`
            );

            setTicketList(result.data.invoice_details);
          } catch (error) {
            console.error(
              "Get Invoice failed! Error: ",
              error
            );
          }
        } else {
          alert("Get Invoice Data failed!");
        }
      };

      fetchInvoice();
    }
  }, [action, cITable, invoiceId]);

  const handleCheckOut = () => {
    const time = new Date().toTimeString().slice(0, 5);
    setCheckOut(true);
    setInvoiceData({ ...invoiceData, end_time: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invoiceData.id) {
      try {
        const invoiceReq = await axiosClient.post(
          "/invoices",
          invoiceData
        );

        for (const ticket of ticketList) {
          await axiosClient.post("/invoice_details", {
            ...ticket,
            invoice_id: invoiceReq.data.invoice.id,
          });
        }
        await axiosClient.put(
          `/tables/update-status/${cITable}`,
          {
            status: "Occupied",
          }
        );

        alert("Add Invoice successfully!");
        setInvoiceFormOpen(false);
        onTablesUpdated();
      } catch (err) {
        alert("Add Invoice failed!");
      }
    } else if (invoiceData.id) {
      try {
        await axiosClient.put(
          `/invoices/${invoiceData.id}`,
          invoiceData
        );

        await axiosClient.delete(
          `/invoice_details/by-invoice/${invoiceData.id}`
        );

        for (const ticket of ticketList) {
          await axiosClient.post("/invoice_details", {
            ...ticket,
            invoice_id: invoiceData.id,
          });
        }
        alert("Update Invoice successfully!");
        setInvoiceFormOpen(false);
        onInvoicesUpdated?.();
        onTablesUpdated?.();
      } catch (err) {
        console.log("Update Invoice failed! Error: ", err);
        alert("Update Invoice failed!");
      }
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete Invoice ID: ${invoiceData.id}?`
      )
    )
      return;

    console.log(invoiceData.table_id);

    try {
      await axiosClient.put(
        `/tables/update-status/${invoiceData.table_id}`,
        { status: "Available" }
      );
      await axiosClient.delete(
        `/invoices/${invoiceData.id}`
      );
      alert(
        `Deleted Invoice ID: ${invoiceData.id} successfully!`
      );
      onInvoicesUpdated?.();
      onTablesUpdated?.();
      setInvoiceFormOpen(false);
    } catch (error) {
      alert(`Delete Invoice ID: ${invoiceData.id} failed!`);
      console.error(error);
    }
  };

  return (
    <>
      <div className="invoice-form__container w-100">
        <div className="check-in-form__section container">
          <div className="form__header d-flex align-items-center w-100 mt-3">
            <h2 className="m-0 me-auto">{action}</h2>
            {action === "Invoice" &&
              invoiceData.status === "Unpaid" && (
                <button
                  type="button"
                  className="btn btn-success me-1 d-flex"
                  title="Check Out"
                  onClick={handleCheckOut}
                >
                  <p className="d-sm-flex d-none m-0 p-0 me-2">
                    Check Out
                  </p>
                  <i className="bi bi-check-circle"></i>
                </button>
              )}

            <button
              type="button"
              title="Close"
              className="btn btn-secondary d-flex"
              onClick={() => setInvoiceFormOpen(false)}
            >
              <p className="d-sm-flex d-none m-0 p-0 me-2">
                Close
              </p>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="m-3 w-100"
          >
            <GeneralInfoForm
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
            />

            <TicketInfoForm
              invoiceData={invoiceData}
              ticketList={ticketList}
              setTicketList={setTicketList}
            />

            <InvoiceDetail
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
              ticketList={ticketList}
            />

            {action === "Check In" ? (
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={
                  ticketList.length === 0 ||
                  ticketList.some(
                    (item) => item.ticketId === 0
                  )
                }
              >
                Export Invoice
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={
                    ticketList.length === 0 ||
                    ticketList.some(
                      (item) =>
                        item.ticketId === 0 ||
                        invoiceData.amount_paid > 0
                    )
                  }
                >
                  Update Invoice
                </button>
              </>
            )}

            {userRole === "Manager" &&
              action === "Invoice" && (
                <>
                  <button
                    type="button"
                    className="btn btn-danger col-12 mt-1"
                    onClick={handleDelete}
                  >
                    Delete Invoice
                  </button>
                </>
              )}
          </form>
        </div>
      </div>
      {isCheckOut && (
        <PaymentForm
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
          ticketList={ticketList}
          setCheckOut={setCheckOut}
          setInvoiceFormOpen={setInvoiceFormOpen}
          onTablesUpdated={onTablesUpdated}
          onInvoicesUpdated={onInvoicesUpdated}
        />
      )}
    </>
  );
}
