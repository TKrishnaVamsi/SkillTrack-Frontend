import React, { useState } from "react";
import API from "../services/api";

const UploadCertificate = () => {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    issueDate: "",
    expiryDate: "",
    skillTags: "",
    description: "",
    category: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    if (!form.title || !form.organization || !form.issueDate) {
      setError("Title, organization, and issue date are required.");
      return;
    }
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        setError("You must be logged in to upload a certificate.");
        setLoading(false);
        return;
      }
      const payload = {
        ...form,
        user: { id: user.id },
      };
      await API.post("/certificates", payload);
      setSuccess(true);
      setForm({ title: "", organization: "", issueDate: "", expiryDate: "", skillTags: "", description: "", category: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || null;
      setError(msg ? `Failed to save certificate: ${msg}` : "Failed to save certificate. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Upload Certificate</h2>
        <p className="text-gray-500 text-sm mt-1">Add a new certification to your profile</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl">
        {success && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Certificate saved successfully!
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Certificate Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              placeholder="e.g. AWS Certified Solutions Architect"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Organization <span className="text-red-500">*</span>
            </label>
            <input
              name="organization"
              value={form.organization}
              placeholder="e.g. Amazon Web Services"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <input
              name="category"
              value={form.category}
              placeholder="e.g. Cloud, Security, DevOps"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Issue Date <span className="text-red-500">*</span>
            </label>
            <input
              name="issueDate"
              type="date"
              value={form.issueDate}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Skill Tags</label>
            <input
              name="skillTags"
              value={form.skillTags}
              placeholder="e.g. AWS, Cloud, Architecture"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              rows={3}
              placeholder="Brief description of the certificate..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {loading ? "Saving..." : "Save Certificate"}
        </button>
      </div>
    </div>
  );
};

export default UploadCertificate;
