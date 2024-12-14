import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useContestById = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contest = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contestById", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests/${id}`);
      return data;
    },
  });
  return { contest, error, isLoading, refetch };
};

export default useContestById;
