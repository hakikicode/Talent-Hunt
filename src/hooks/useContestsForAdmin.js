import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const limit = import.meta.env.VITE_APP_PAGE_SIZE || 10;

const useContestForAdmin = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["contests", "admin", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contests/admin?page=${page}&limit=${limit}`
      );
      return data;
    },
  });

  return {
    contests: data?.result || [],
    count: data?.count || 0,
    error,
    isLoading,
    refetch,
  };
};

export default useContestForAdmin;
