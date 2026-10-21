import React, { useEffect, useState } from "react";

import axiosClient from "../../../api/axiosClient";

import TableForm from "../TableForm/TableForm";
import InvoiceForm from "../../Invoices/InvoiceForm/InvoiceForm";

import "./TableList.css";

export default function TableList({ userRole }) {
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [isTableFormOpen, setTableFormOpen] =
    useState(false);
  const [isInvoiceFormOpen, setInvoiceFormOpen] =
    useState(false);
  const [cITable, setCITable] = useState(null);
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("All");
  const [seatingCap, setSeatingCap] = useState(0);

  useEffect(() => {
    if (seatingCap !== undefined && status !== "")
      fetchTables();
  }, [userRole, status, seatingCap]);

  const fetchTables = () => {
    axiosClient
      .get(`/tables/by-filter/${seatingCap}/${status}`)
      .then((res) => setTables(res.data.tables))
      .catch((err) => console.error("Fetch error:", err));
  };

  const toggleTableForm = (formAction, tableId = null) => {
    setAction(formAction);
    if (tableId) {
      axiosClient
        .get(`/tables/by-id/${tableId}`)
        .then((res) => setTableData(res.data.table))
        .catch(() => setTableData(null))
        .finally(() => setTableFormOpen(true));
    } else {
      setTableData(null);
      setTableFormOpen(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isTableFormOpen
      ? "hidden"
      : "";
  }, [isTableFormOpen]);

  const handleDelete = async (tableId) => {
    if (!window.confirm(`Delete this table ${tableId}?`))
      return;
    try {
      await axiosClient.delete(`/tables/${tableId}`);
      alert(`Deleted table ${tableId} successfully!`);
      fetchTables();
    } catch {
      alert(`Delete table ${tableId} failed!`);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isInvoiceFormOpen
      ? "hidden"
      : "";
  }, [isInvoiceFormOpen]);

  return (
    <div className="table-list__container m-0 p-2">
      {userRole === "Manager" && (
        <button
          className="btn btn-primary mb-2"
          onClick={() => toggleTableForm("Add Table")}
        >
          Add Table
        </button>
      )}

      <div className="table-list__section">
        <table className="table-list table table-hover text-center align-middle">
          <thead>
            <tr>
              <th>Table</th>
              <th>
                Capacity
                <select
                  value={seatingCap}
                  onChange={(e) =>
                    setSeatingCap(Number(e.target.value))
                  }
                  className="ms-2"
                >
                  <option value={0}>All</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                </select>
              </th>
              <th>
                Status:
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="All">All</option>
                  <option value="Available">
                    Available
                  </option>
                  <option value="Occupied">Occupied</option>
                </select>
              </th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tables.map(({ id, seating_cap, status }) => (
              <tr key={id}>
                <th>{id}</th>
                <td>{seating_cap}</td>
                <td
                  className={
                    status === "Available"
                      ? "text-success"
                      : "text-danger"
                  }
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {status}
                </td>
                <td>
                  {status === "Available" ? (
                    <button
                      className="btn btn-success"
                      title="Check in"
                      onClick={() =>
                        setInvoiceFormOpen(true) &
                        setCITable(id) &
                        setAction("Check In")
                      }
                    >
                      <i className="bi bi-check2-square"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      title="View"
                      onClick={() =>
                        setInvoiceFormOpen(true) &
                        setCITable(id) &
                        setAction("Invoice")
                      }
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-warning"
                    title="Edit"
                    onClick={() =>
                      toggleTableForm("Edit Table", id)
                    }
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  {userRole === "Manager" &&
                    status === "Available" && (
                      <button
                        className="btn btn-danger"
                        title="Delete"
                        onClick={() => handleDelete(id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTableFormOpen && (
        <TableForm
          action={action}
          tableData={tableData}
          userRole={userRole}
          setTableFormOpen={setTableFormOpen}
          onTablesUpdate={fetchTables}
        />
      )}

      {isInvoiceFormOpen && (
        <InvoiceForm
          action={action}
          userRole={userRole}
          cITable={cITable}
          setInvoiceFormOpen={setInvoiceFormOpen}
          onTablesUpdated={fetchTables}
        />
      )}
    </div>
  );
}
