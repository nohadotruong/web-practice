import React, { useEffect } from "react";

import "./GeneralInfoForm.css";

export default function GeneralInfoForm({
  invoiceData,
  setInvoiceData,
}) {
  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="general-info__section row m-0 mb-3 w-100">
      <h5>General info</h5>
      <div className="input__section col-sm-5 p-2 ">
        <label className="ps-1" htmlFor="">
          Date:
        </label>{" "}
        <br />
        <input
          className="w-100"
          type="text"
          readOnly
          value={invoiceData.date}
        />
      </div>
      <div className="input__section col-sm-4 p-2">
        <label className="ps-1" htmlFor="">
          Start time:
        </label>{" "}
        <br />
        <input
          className="w-100"
          type="text"
          readOnly
          value={invoiceData.start_time}
        />
      </div>
      <div className="input__section col-sm-3 p-2">
        <label className="ps-1" htmlFor="">
          Table:
        </label>{" "}
        <br />
        <input
          className="w-100"
          type="number"
          readOnly
          value={invoiceData.table_id}
        />
      </div>
      <div className="input__section col-12 p-2">
        <label className="ps-1" htmlFor="">
          Note:
        </label>{" "}
        <br />
        <textarea
          className="w-100"
          name="note"
          rows={3}
          value={invoiceData?.note || ""}
          onChange={handleChange}
          placeholder="Note..."
          readOnly={invoiceData.status === "Paid"}
        ></textarea>
      </div>
    </div>
  );
}
