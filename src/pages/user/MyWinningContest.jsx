import Empty from "../../components/Shared/Empty";
import Loader from "../../components/Shared/Loader";
import useWinningContest from "../../hooks/useWinningContest";

const MyWinningContest = () => {
  const { contests, isLoading } = useWinningContest();

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-8">My Winning Contest</h1>
      {contests.length === 0 && <Empty resourceName="contest" />}
      {contests.length !== 0 && (
        <div className="bg-white p-8 ">
          {contests?.map((contest) => (
            <div
              key={contest._id}
              className="border border-gray-300 break-words rounded p-4 mb-4"
            >
              <h2 className="text-lg font-bold mb-2">{contest.title}</h2>
              <p className="text-gray-500 mb-2">
                Deadline: {new Date(contest.deadline).toLocaleString()}
              </p>
              <p>{contest.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                ${contest.prizeMoney} Prize Money
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinningContest;
