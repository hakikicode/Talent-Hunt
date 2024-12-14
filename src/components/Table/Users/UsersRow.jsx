import toast from "react-hot-toast";
import { updateUser } from "../../../api/apiUsers";
import Table from "../Table";
import { useSearchParams } from "react-router-dom";

const PAZE_SIZE = import.meta.env.VITE_APP_PAGE_SIZE;

const UsersRow = ({ item, idx }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      toast.success("User role updated");
    } catch (error) {
      toast.error(error?.message || "Error updating user");
    }
  };

  return (
    <Table.Row>
      <div className="font-medium font-sono">
        {`${idx + 1 + PAZE_SIZE * (page - 1)}`.padStart(2, "0")}
      </div>
      <div>
        <img src={item.image} alt="" className="w-10 h-10 object-cover" />
      </div>
      <div className="font-medium font-sono text-gray-700">{item.name}</div>
      <div className="font-sono">{item.email}</div>
      <div>
        <select
          className="block font-sono w-full py-2 px-4 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={item?.role}
          onChange={(e) => handleRoleChange(item._id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="creator">Creator</option>
        </select>
      </div>
    </Table.Row>
  );
};

export default UsersRow;
