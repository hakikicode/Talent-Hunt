import { useQuery } from "@tanstack/react-query";
import { getPopularContests } from "../api/apiContests";

const usePopularContests = () => {
  const {
    data: contests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["contests", "popular"],
    queryFn: async () => await getPopularContests(),
  });

  return { contests, error, isLoading };
};

export default usePopularContests;
