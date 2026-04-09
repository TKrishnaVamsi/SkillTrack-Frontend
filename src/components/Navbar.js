import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">SkillTrack</h1>

      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard/profile" className="hover:text-gray-300">Profile</Link>
        <Link to="/dashboard/certificates" className="hover:text-gray-300">Certificates</Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;