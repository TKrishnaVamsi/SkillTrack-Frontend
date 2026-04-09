import React, { useEffect, useState } from "react";
import API from "../services/api";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchCertificates = () => {
    API.get("/certificates")
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await API.delete(`/certificates/${id}`);
      fetchCertificates();
    } catch {
      alert("Failed to delete.");
    }
  };

  const startEdit = (cert) => {
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/certificates/${editingId}`, editForm);
      setEditingId(null);
      fetchCertificates();
    } catch {
      alert("Failed to update.");
    }
  };

  const filtered = certificates.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.organization?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const isExpiringSoon = (date) => {
    if (!date) return false;
    const diff = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  };

  const isExpired = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certificates</h2>
          <p className="text-gray-500 text-sm mt-1">{certificates.length} total certificates</p>
        </div>
        <input
          placeholder="Search by title, org, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-white"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          No certificates found.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">#</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Title</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Organization</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Category</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Issue Date</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Expiry Date</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Status</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                  {editingId === cert.id ? (
                    <>
                      <td className="px-5 py-3 text-gray-400">{cert.id}</td>
                      <td className="px-5 py-3">
                        <input
                          className="border rounded px-2 py-1 w-full text-sm"
                          value={editForm.title || ""}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          className="border rounded px-2 py-1 w-full text-sm"
                          value={editForm.organization || ""}
                          onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          className="border rounded px-2 py-1 w-full text-sm"
                          value={editForm.category || ""}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        />
                      </td>
                      <td className="px-5 py-3">{cert.issueDate}</td>
                      <td className="px-5 py-3">{cert.expiryDate}</td>
                      <td className="px-5 py-3" />
                      <td className="px-5 py-3 flex gap-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3 text-gray-400">{cert.id}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{cert.title}</td>
                      <td className="px-5 py-3 text-gray-600">{cert.organization}</td>
                      <td className="px-5 py-3">
                        {cert.category && (
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                            {cert.category}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{cert.issueDate}</td>
                      <td className="px-5 py-3 text-gray-600">{cert.expiryDate || "—"}</td>
                      <td className="px-5 py-3">
                        {isExpired(cert.expiryDate) ? (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                            Expired
                          </span>
                        ) : isExpiringSoon(cert.expiryDate) ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                            Expiring Soon
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 flex gap-2">
                        <button
                          onClick={() => startEdit(cert)}
                          className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Certificates;
