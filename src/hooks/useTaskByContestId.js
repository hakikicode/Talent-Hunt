import { useQuery } from "@tanstack/react-query";
import { getTaskByContestId } from "../api/apiTask";

const useTaskByContestId = (contestId) => {
  const {
    data: task,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["taskByUser", contestId],
    enabled: !!contestId,
    queryFn: async () => await getTaskByContestId(contestId),
  });

  return { task, error, isLoading, refetch };
};

export default useTaskByContestId;
