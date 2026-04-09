import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}

export default DashboardLayout;