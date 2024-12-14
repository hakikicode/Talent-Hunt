import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests/user-stats`);
      return data;
    },
  });

  return { stats, error, isLoading };
};

export default useUserStats;
