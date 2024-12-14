import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRegisteredContest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["registeredContest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests/registered");
      return data;
    },
  });

  return { contests, error, isLoading };
};

export default useRegisteredContest;
