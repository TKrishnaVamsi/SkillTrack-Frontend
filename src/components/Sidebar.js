import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">

      {/* Top */}
      <div>
        <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
          SkillTrack
        </h1>

        <nav className="flex flex-col p-4 gap-3">
          <Link to="/dashboard" className="hover:bg-gray-800 p-2 rounded">
            🏠 Dashboard
          </Link>

          <Link to="/dashboard/profile" className="hover:bg-gray-800 p-2 rounded">
            👤 Profile
          </Link>

          <Link to="/dashboard/certificates" className="hover:bg-gray-800 p-2 rounded">
            📄 Certificates
          </Link>

          <Link to="/dashboard/upload" className="hover:bg-gray-800 p-2 rounded">
            ⬆ Upload
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;