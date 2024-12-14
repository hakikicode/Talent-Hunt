import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../api/apiUsers";

const useAdminStats = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  return { stats, isLoading, error };
};

export default useAdminStats;
