import React, { useEffect, useState } from "react";
import API from "../services/api";

const Employer = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ programName: "", description: "", category: "" });
  const [error, setError] = useState("");

  const fetchPrograms = () => {
    API.get("/employer")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPrograms(); }, []);

  const handleAdd = async () => {
    setError("");
    if (!form.programName) {
      setError("Program name is required.");
      return;
    }
    try {
      await API.post("/employer", form);
      setShowForm(false);
      setForm({ programName: "", description: "", category: "" });
      fetchPrograms();
    } catch {
      setError("Failed to create program.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await API.delete(`/employer/${id}`);
      fetchPrograms();
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certification Programs</h2>
          <p className="text-gray-500 text-sm mt-1">Manage employer-sponsored certification programs</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Program
        </button>
      </div>

      {/* Add Program Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">New Certification Program</h3>
          {error && (
            <p className="text-red-600 text-sm mb-3 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Program Name *"
              value={form.programName}
              onChange={(e) => setForm({ ...form, programName: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              rows={2}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="col-span-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              Save Program
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : programs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 shadow-sm">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="font-medium">No programs yet</p>
          <p className="text-sm mt-1">Add your first certification program above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <button
                  onClick={() => handleDelete(program.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{program.programName}</h3>
              {program.category && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mb-2">
                  {program.category}
                </span>
              )}
              {program.description && (
                <p className="text-gray-500 text-xs leading-relaxed">{program.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employer;
