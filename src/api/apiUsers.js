import { axiosPublic, axiosSecure } from ".";

export const getAllUsers = async (page) => {
  const limit = import.meta.env.VITE_APP_PAGE_SIZE || 5;
  const { data } = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
  return data;
};

// get user by email
export const getUser = async (email) => {
  const { data } = await axiosSecure.get(`/users/${email}`);
  return data;
};

export const updateUser = async (id, user) => {
  const { data } = await axiosSecure.patch(`/users/${id}`, user);
  return data;
};

export const getLeaderBoard = async () => {
  const { data } = await axiosPublic.get("/contests/leaderboard");
  return data;
};

export const addCredit = async (credits) => {
  const { data } = await axiosSecure.patch(`/users/credits`, credits);
  return data;
};

export const getAdminStats = async () => {
  const { data } = await axiosSecure.get(`/users/admin-stats`);
  return data;
};
