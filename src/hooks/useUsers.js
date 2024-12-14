import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const limit = import.meta.env.VITE_APP_PAGE_SIZE || 10;

const useUsers = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?page=${page}&limit=${limit}`
      );
      return data;
    },
  });

  return { users: data?.users || [], count: data?.count, error, isLoading };
};

export default useUsers;
