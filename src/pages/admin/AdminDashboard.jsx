import Loader from "../../components/Shared/Loader";
import useAdminStats from "../../hooks/useAdminStats";
import ContestsChart from "./components/ContestsChart";
import StatsContainer from "./components/StatsContainer";

const AdminDashboard = () => {
  const { stats, isLoading } = useAdminStats();

  if (isLoading) return <Loader />;

  console.log(stats);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-600 mb-4">Admin Dashboard</h1>
      <StatsContainer
        stats={{
          users: stats.users,
          contests: stats.totalContests,
          acceptedContests: stats.contests.length,
        }}
      />
      <ContestsChart contests={stats.contests} />
    </div>
  );
};

export default AdminDashboard;
