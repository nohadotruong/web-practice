import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { cloudinaryConfig } from "../config/cloudinaryConfig";

const initialFormData = {
  name: "",
  brand_id: "",
  series: "",
  screen_size: "",
  storage: "",
  ram: "",
  os: "",
  charging_port: "",
  release_date: "",
  price: "",
  quantity: "",
  status: "",
  thumbnail: "",
  image1: "",
  image2: "",
  image3: "",
};

export default function AddProduct() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/brands")
      .then((res) => setBrands(res.data))
      .catch((err) =>
        console.error("Failed to fetch brands:", err)
      );
  }, []);

  const uploadToCloudinary = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      cloudinaryConfig.uploadPreset
    );

    try {
      const res = await fetch(cloudinaryConfig.uploadUrl, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed!");
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary error:", err);
      return null;
    }
  };

  const handleChange = async (e) => {
    const { name, type, value, files } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (type === "file") {
      const file = files[0];
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          [name]: imageUrl,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "Upload failed",
        }));
      }
    } else {
      const updated = { ...formData, [name]: value };
      if (name === "quantity") {
        updated.status =
          parseInt(value) > 0 ? "In Stock" : "Out of Stock";
      }
      setFormData(updated);
    }
  };

  const validate = () => {
    const requiredFields = Object.entries(formData);
    const newErrors = {};
    for (const [key, value] of requiredFields) {
      if (!value)
        newErrors[key] = `${key.replaceAll(
          "_",
          " "
        )} is required!`;
    }
    return newErrors;
  };

  const handleAddProduct = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setMessage("Loading...");
    try {
      await axiosClient.post(
        "/products/add_products",
        formData
      );
      setMessage("Add product successful!");
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      console.log("Add product error:", err);
      setMessage("Add product failed!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add product</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.name}</div>

      <select
        name="brand_id"
        value={formData.brand_id}
        onChange={handleChange}
      >
        <option value="">-- Select Brand --</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <div style={{ color: "red" }}>{errors.brand_id}</div>

      {[
        { name: "series", placeholder: "Series" },
        {
          name: "screen_size",
          placeholder: "Screen Size",
          type: "number",
        },
        {
          name: "storage",
          placeholder: "Storage",
          type: "number",
        },
        { name: "ram", placeholder: "RAM", type: "number" },
      ].map(({ name, ...rest }) => (
        <div key={name}>
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            {...rest}
          />
          <div style={{ color: "red" }}>{errors[name]}</div>
        </div>
      ))}

      <select
        name="os"
        value={formData.os}
        onChange={handleChange}
      >
        <option value="">-- Select OS --</option>
        <option value="Android">Android</option>
        <option value="iOS">iOS</option>
      </select>
      <div style={{ color: "red" }}>{errors.os}</div>

      <select
        name="charging_port"
        value={formData.charging_port}
        onChange={handleChange}
      >
        <option value="">-- Select Charging Port --</option>
        <option value="USB Type-C">USB Type-C</option>
        <option value="Lightning">Lightning</option>
        <option value="Micro USB">Micro USB</option>
      </select>

      {[
        { name: "release_date", type: "date" },
        {
          name: "price",
          placeholder: "Price",
          type: "number",
        },
        {
          name: "quantity",
          placeholder: "Quantity",
          type: "number",
        },
      ].map(({ name, ...rest }) => (
        <div key={name}>
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            {...rest}
          />
          <div style={{ color: "red" }}>{errors[name]}</div>
        </div>
      ))}
      <div style={{ color: "red" }}>
        {errors.charging_port}
      </div>

      <input
        name="status"
        value={formData.status}
        placeholder="Status"
        readOnly
      />
      <div style={{ color: "red" }}>{errors.status}</div>

      {["thumbnail", "image1", "image2", "image3"].map(
        (img) => (
          <div key={img}>
            <label>{img.toUpperCase()}:</label>
            <input
              type="file"
              name={img}
              onChange={handleChange}
            />
            {formData[img] && (
              <img
                src={formData[img]}
                alt={img}
                style={{ height: "50px" }}
              />
            )}
            <div style={{ color: "red" }}>
              {errors[img]}
            </div>
          </div>
        )
      )}

      <button onClick={handleAddProduct}>Add</button>
      {message && <p>{message}</p>}
    </div>
  );
}
