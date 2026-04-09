import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, ...form }));
    setUser({ ...user, ...form });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const roleColor = (role) => {
    if (role === "ADMIN") return "bg-purple-100 text-purple-700";
    if (role === "EMPLOYER") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-500 text-sm mt-1">Your account details</p>
      </div>

      {saved && (
        <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Profile updated successfully.
        </div>
      )}

      <div className="max-w-2xl space-y-5">
        {/* Avatar card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.name || "—"}</p>
            <p className="text-sm text-gray-500">{user?.email || "—"}</p>
            <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${roleColor(user?.role)}`}>
              {user?.role || "USER"}
            </span>
          </div>
        </div>

        {/* Details card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Account Information</h3>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => { setEditing(false); setForm({ ...user }); }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { label: "Full Name", value: user?.name },
                { label: "Email Address", value: user?.email },
                { label: "Role", value: user?.role || "USER" },
                { label: "User ID", value: user?.id ? `#${user.id}` : "—" },
              ].map((field) => (
                <div key={field.label} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-gray-500 w-40 flex-shrink-0">{field.label}</span>
                  <span className="text-sm font-medium text-gray-900">{field.value || "—"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
