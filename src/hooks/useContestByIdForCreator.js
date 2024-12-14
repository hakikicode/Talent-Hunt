import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import useAxiosSecure from "./useAxiosSecure";

const useContestByIdForCreator = (contestId) => {
  const { userData } = useUser();
  const axiosSecure = useAxiosSecure();

  const {
    data: contest,
    error,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!userData,
    queryKey: ["contestByIdForCreator"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contests/${contestId}/creator/${userData?._id}`
      );
      return data;
    },
  });
  return { contest, refetch, error, isLoading };
};

export default useContestByIdForCreator;
