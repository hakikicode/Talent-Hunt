import { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "../../components/Table/Users/UsersTable";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user registrations
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error.message);
    } finally {
      setLoading(false); // Ensure loading state is set to false
    }
  };

  // Handle download of registrations
  const handleDownload = async (format) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`/api/admin/registrations/export/${format}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `registrations.${format}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`Failed to export registrations as ${format}:`, error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Main component render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Manage Users</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleDownload("csv")}
          className="bg-blue-500 px-4 py-2 text-white rounded"
        >
          Download CSV
        </button>
        <button
          onClick={() => handleDownload("xlsx")}
          className="bg-green-500 px-4 py-2 text-white rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Render Users Table */}
      <UsersTable data={users} />
    </div>
  );
};

export default ManageUser;
