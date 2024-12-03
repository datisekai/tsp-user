import { apiConfig, processMiddlewareSendRequest } from "../apis";

export const classService = {
  getMe: async (query: any) => {
    const { getMe } = apiConfig.class;
    return processMiddlewareSendRequest({ ...getMe, body: query });
  },
  join: async (secretKey: string) => {
    const { join } = apiConfig.class;
    return processMiddlewareSendRequest({
      ...join,
      endpoint: join.endpoint.replace(":secretKey", secretKey),
    });
  },
};
