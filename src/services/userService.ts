import { apiConfig, processMiddlewareSendRequest } from "../apis";

export const UserService = {
  getMe: async () => {
    const { getMe } = apiConfig;
    return processMiddlewareSendRequest(getMe);
  },
};
