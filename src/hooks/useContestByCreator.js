import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const limit = import.meta.env.VITE_APP_PAGE_SIZE || 10;

const useContestByCreator = () => {
  const { userData } = useUser();
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading, refetch } = useQuery({
    enabled: !!userData,
    queryKey: ["contestByCreator", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contests/creator/${userData?._id}?page=${page}&limit=${limit}`
      );
      return data;
    },
  });
  return {
    contests: data?.contests || [],
    count: data?.count || 0,
    refetch,
    error,
    isLoading,
  };
};

export default useContestByCreator;
