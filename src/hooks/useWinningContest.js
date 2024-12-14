import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWinningContest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["winningContest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests/winning");
      return data;
    },
  });

  return { contests, error, isLoading };
};

export default useWinningContest;
