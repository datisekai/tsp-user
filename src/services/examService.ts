import { apiConfig, processMiddlewareSendRequest } from "../apis";

const { exam } = apiConfig;
export const examService = {
  getAll: async (query: any) => {
    const { getAll } = exam;
    return processMiddlewareSendRequest({ ...getAll, body: query });
  },
};
