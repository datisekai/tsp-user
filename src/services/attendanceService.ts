import { apiConfig, processMiddlewareSendRequest } from "../apis";

const { attendance } = apiConfig;
export const attendanceService = {
  getAll: async (query: any) => {
    const { getAll } = attendance;
    return processMiddlewareSendRequest({ ...getAll, body: query });
  },
};
