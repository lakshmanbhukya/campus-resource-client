import React, { useState } from "react";
import "./Dashboard.css";

const AddResource = ({ onAddResource }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await onAddResource(formData);

    if (result.success) {
      setMessage("Resource added successfully!");
      setFormData({ title: "", description: "" });
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="add-resource">
      <h2>Add New Resource</h2>

      <form onSubmit={handleSubmit} className="resource-form">
        <div className="form-group">
          <label htmlFor="title">Resource Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Laptop, Calculator, Books"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe the resource, its condition, and any special requirements..."
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </form>

      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddResource;
