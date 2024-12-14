import { axiosPublic, axiosSecure } from ".";

// Get all contests
export const getAllContests = async (page, text) => {
  const { data } = await axiosPublic.get(`/contests?search=${text}`);
  return data;
};

// Get popular contests
export const getPopularContests = async () => {
  const { data } = await axiosPublic.get("/contests/popular");
  return data;
};

// Get contest by id
export const getContestById = async (id) => {
  const { data } = await axiosSecure.get(`/contests/${id}`);
  return data;
};

// Get contest by creator
export const getContestByCreator = async (creatorId, page) => {
  const limit = import.meta.env.VITE_APP_PAGE_SIZE || 5;
  const { data } = await axiosSecure.get(
    `/contests/creator/${creatorId}?page=${page}&limit=${limit}`
  );
  return data;
};

// Get contest for admin
export const getContestForAdmin = async (page) => {
  const limit = import.meta.env.VITE_APP_PAGE_SIZE || 5;
  const { data } = await axiosSecure.get(
    `/contests/admin?page=${page}&limit=${limit}`
  );
  return data;
};

// Get contest by id for creator
export const getContestByIdForCreator = async (contestId, creatorId) => {
  const { data } = await axiosSecure.get(
    `/contests/${contestId}/creator/${creatorId}`
  );
  return data;
};

// Get registered contests for user
export const getRegisteredContests = async () => {
  const { data } = await axiosSecure.get("/contests/registered");
  return data;
};

// Get winning contests for user
export const getWinningContests = async () => {
  const { data } = await axiosSecure.get("/contests/winning");
  return data;
};

// Save a contest in DB
export const saveContest = async (contest) => {
  const { data } = await axiosSecure.post("/contests", contest);
  return data;
};

// Update a contest in DB
export const updateContest = async (id, contest) => {
  const { data } = await axiosSecure.patch(`/contests/${id}`, contest);
  return data;
};

// Add a submission to a contest
export const addParticipant = async (contestId, userId) => {
  const { data } = await axiosSecure.patch(
    `/contests/${contestId}/participant/${userId}`,
    {}
  );
  return data;
};

// Declare a winner for a contest
export const declareWinner = async (contestId, winner) => {
  const { data } = await axiosSecure.patch(
    `/contests/${contestId}/winner`,
    winner
  );
  return data;
};

// Delete a contest in DB
export const deleteContest = async (id) => {
  const { data } = await axiosSecure.delete(`/contests/${id}`);
  return data;
};

// Get winners
export const getWinners = async () => {
  const { data } = await axiosPublic.get("/contests/winners");
  return data;
};

// Get best creators
export const getBestCreators = async () => {
  const { data } = await axiosPublic.get("/contests/best-creator");
  return data;
};

// Get user stats
export const getUserStats = async () => {
  const { data } = await axiosSecure.get(`/contests/user-stats`);
  return data;
};
