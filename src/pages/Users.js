import React, { useEffect, useState } from "react";
import API from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");

  const fetchUsers = () => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      await API.post("/users", form);
      setShowForm(false);
      setForm({ name: "", email: "", password: "", role: "USER" });
      fetchUsers();
    } catch {
      setError("Failed to add user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user.");
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/users/${editingId}`, editForm);
      setEditingId(null);
      fetchUsers();
    } catch {
      alert("Failed to update.");
    }
  };

  const roleColor = (role) => {
    if (role === "ADMIN") return "bg-purple-100 text-purple-700";
    if (role === "EMPLOYER") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Add New User</h3>
          {error && (
            <p className="text-red-600 text-sm mb-3 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              Save User
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
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">#</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Name</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Email</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Role</th>
                <th className="text-left px-5 py-3 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {editingId === user.id ? (
                    <>
                      <td className="px-5 py-3 text-gray-400">{user.id}</td>
                      <td className="px-5 py-3">
                        <input
                          className="border rounded px-2 py-1 text-sm w-full"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          className="border rounded px-2 py-1 text-sm w-full"
                          value={editForm.email || ""}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={editForm.role || "USER"}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        >
                          <option value="USER">User</option>
                          <option value="ADMIN">Admin</option>
                          <option value="EMPLOYER">Employer</option>
                        </select>
                      </td>
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
                      <td className="px-5 py-3 text-gray-400">{user.id}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{user.name}</td>
                      <td className="px-5 py-3 text-gray-600">{user.email}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColor(user.role)}`}>
                          {user.role || "USER"}
                        </span>
                      </td>
                      <td className="px-5 py-3 flex gap-2">
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-10">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
