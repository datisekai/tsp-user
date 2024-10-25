import { apiConfig, processMiddlewareSendRequest } from "../apis";

const { notification } = apiConfig;
export const notificationService = {
  getAll: async (query: any) => {
    const { getAll } = notification;
    return processMiddlewareSendRequest({ ...getAll, body: query });
  },
};
