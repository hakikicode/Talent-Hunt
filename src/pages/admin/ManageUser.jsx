import { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "../../components/Table/Users/UsersTable";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user registrations
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/registrations");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle download of registrations
  const handleDownload = async () => {
    try {
      const response = await axios.get("/registrations/export", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "registrations.csv"); // or .xlsx for Excel
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Failed to export registrations:", error.message);
    }
  };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Main component render
  return (
    <div>
      <h1 className="text-3xl text-gray-700 font-bold mb-4">Manage Users</h1>
      <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Download Registrations
      </button>
      <UsersTable data={users} />
    </div>
  );
};

export default ManageUser;
