import CreatedContestTable from "../../components/Table/CreatedContests/CreatedContestTable";

const MyCreatedContest = () => {
  return (
    <div>
      <h1 className="text-3xl text-gray-700 font-bold mb-4">
        My Created Contests
      </h1>
      <CreatedContestTable />
    </div>
  );
};

export default MyCreatedContest;
