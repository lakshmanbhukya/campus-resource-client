import React, { useState } from "react";

const CATEGORIES = [
  "Textbooks",
  "Cameras",
  "Lab equipment",
  "Sports gear",
  "Instruments",
  "Other",
];

const AddResource = ({ onAddResource, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Textbooks",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Combine category into description or pass as category
    const result = await onAddResource(formData);

    if (result.success) {
      if (onClose) onClose();
    } else {
      setError(result.message || "Failed to add resource");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-[540px] rounded-2xl border border-[#eceae4] bg-[#f7f4ed] p-6 sm:p-8 text-[#1c1c1c] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#eceae4] pb-4">
          <h2 className="text-[24px] font-semibold tracking-[-0.5px]">
            Add new resource
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-[#5f5f5d] hover:bg-[rgba(28,28,28,0.05)] hover:text-[#1c1c1c] transition-colors"
            >
              <i className="ti ti-x text-[20px]"></i>
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#1c1c1c] bg-[#fcfbf8] p-3 text-[14px]">
            <i className="ti ti-alert-circle text-[16px]"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-[14px] font-medium"
            >
              Resource Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Canon EOS 2000D DSLR kit"
              className="w-full rounded-[6px] border border-[#eceae4] bg-[#fcfbf8] px-3.5 py-2 text-[15px] outline-none focus:border-[#1c1c1c] focus:ring-1 focus:ring-[#1c1c1c]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-[14px] font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-[6px] border border-[#eceae4] bg-[#fcfbf8] px-3.5 py-2 text-[15px] outline-none focus:border-[#1c1c1c] focus:ring-1 focus:ring-[#1c1c1c]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-[14px] font-medium"
            >
              Description & Condition
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="e.g. 24.1MP crop-sensor body with 18-55mm kit lens and charger."
              className="w-full rounded-[6px] border border-[#eceae4] bg-[#fcfbf8] px-3.5 py-2 text-[15px] outline-none focus:border-[#1c1c1c] focus:ring-1 focus:ring-[#1c1c1c]"
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost btn-sm"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-inset rounded-md bg-[#1c1c1c] px-4 py-2 text-[14px] font-medium text-[#fcfbf8] disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResource;
