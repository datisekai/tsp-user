import { apiConfig, processMiddlewareSendRequest } from "../apis";

const { letter } = apiConfig;
export const letterService = {
  getAll: async (query: any) => {
    const { getAll } = letter;
    return processMiddlewareSendRequest({ ...getAll, body: query });
  },
  create: async (body: any) => {
    const { create } = letter;
    return processMiddlewareSendRequest({ ...create, body });
  },
  delete: async (id: number) => {
    const { delete: deleteLetter } = letter;
    return processMiddlewareSendRequest({
      ...deleteLetter,
      endpoint: deleteLetter.endpoint.replace(":id", id.toString()),
    });
  },
};
