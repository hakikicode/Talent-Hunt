import toast from "react-hot-toast";
import Table from "../Table";
import { Link, useLocation } from "react-router-dom";
import { deleteContest, updateContest } from "../../../api/apiContests";
import ConfirmDelete from "../../Shared/ConfirmDelete";

const ContestRow = ({ item: contest, refetch }) => {
  const location = useLocation();

  const handleDelete = async (contestId) => {
    try {
      await deleteContest(contestId);
      refetch();
      toast.success("Contest deleted");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleToggle = async (contestId, status) => {
    try {
      await updateContest(contestId, { status });
      refetch();
      toast.success("Status updated");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Table.Row>
      <div className="font-medium font-sono">
        <Link
          to={`/contests/${contest._id}`}
          className="text-sm text-gray-900 font-medium hover:underline hover:text-blue-700"
        >
          {contest?.title}
        </Link>
      </div>
      <div>
        <div className="text-sm text-gray-900">
          {new Date(contest?.deadline).toLocaleDateString()}
        </div>
      </div>
      <div className="font-medium font-sono text-gray-700">
        <div className="text-sm text-gray-900">{contest?.creator?.name}</div>
      </div>
      <div className="font-sono">
        {" "}
        <span
          className={`px-2 py-[2px] ${
            contest?.status === "accepted" ? "bg-green-400" : "bg-red-400"
          } rounded-xl text-white font-medium text-sm flex items-center justify-center`}
        >
          {contest?.status}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Link
          to={`/dashboard/contests/${contest._id}/update`}
          state={{ from: location }}
        >
          <button className="px-4 py-2 mr-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
            Edit
          </button>
        </Link>
        <ConfirmDelete
          resourceName="Contest"
          onConfirm={() => handleDelete(contest._id)}
        >
          <button className="px-4 py-2 mr-2 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white">
            Delete
          </button>
        </ConfirmDelete>
        <button
          className="px-4 py-2 text-sm font-medium text-green-500 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white"
          onClick={() =>
            handleToggle(
              contest._id,
              contest.status === "pending" ? "accepted" : "pending"
            )
          }
        >
          {contest.status === "pending" ? "Accept" : "Pending"}
        </button>
      </div>
    </Table.Row>
  );
};

export default ContestRow;
