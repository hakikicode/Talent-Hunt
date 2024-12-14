import { Link, useParams } from "react-router-dom";
import useContestByIdForCreator from "../../hooks/useContestByIdForCreator";
import Loader from "../../components/Shared/Loader";
import { declareWinner } from "../../api/apiContests";
import toast from "react-hot-toast";
import { isContestEnd } from "../../utils";
import Pagination from "../../components/Table/Pagination";

const ContestSubmission = () => {
  const { id } = useParams();
  const { contest, isLoading, refetch } = useContestByIdForCreator(id);

  const handleDeclareWinner = async (participantId) => {
    try {
      await declareWinner(id, { winner: participantId });
      refetch();
      toast.success("Winner declared");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  if (isLoading || !contest) return <Loader />;

  const isEnd = isContestEnd(contest?.deadline);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-10">
        <Link to={`/contests/${contest._id}`} className="hover:underline">
          {contest?.title}
        </Link>
      </h1>
      <div className="flex items-center justify-between text-gray-600 font-medium mb-4">
        <h4>{contest?.participants?.length} Participants</h4>
        <div className="flex items-center gap-x-10">
          <p>
            Status:{" "}
            {isEnd ? (
              <span className="text-red-500">Finished</span>
            ) : (
              <span className="text-green-500">Running</span>
            )}
          </p>
          <h4>
            Deadline: {new Date(contest?.deadline).toLocaleDateString("en-IN")}
          </h4>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              Participant Name
            </th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Submitted Task</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contest?.participants?.map((participant) => (
            <tr
              key={participant._id}
              className={`${
                contest?.winner
                  ? participant?._id === contest?.winner?._id
                    ? "bg-green-50"
                    : "bg-red-50"
                  : "bg-gray-50"
              }`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {participant.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {participant.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {participant.task ? (
                  <a
                    href={participant?.task}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-blue-500"
                  >
                    {participant?.task?.slice(0, 28)}...
                  </a>
                ) : (
                  <p className="text-sm text-red-600">No task submitted</p>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {contest.winner ? (
                  <div className="font-sono ">
                    {participant._id === contest?.winner._id ? (
                      <p>Winner</p>
                    ) : (
                      <p>-----</p>
                    )}
                  </div>
                ) : (
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                    onClick={() => handleDeclareWinner(participant._id)}
                    disabled={contest?.winner?.name}
                  >
                    Declare Winner
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-4 ">
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default ContestSubmission;
