import { axiosSecure } from ".";

// get task for a specific user in a contest
export const getTaskByContestId = async (contestId) => {
  const { data } = await axiosSecure.get(`/tasks/contests/${contestId}`);
  return data;
};

// create task
export const createTask = async (contestId, task) => {
  const { data } = await axiosSecure.post(`/tasks/contests/${contestId}`, task);
  return data;
};
