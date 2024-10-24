import { apiConfig, processMiddlewareSendRequest } from "../apis";

export const AuthService = {
  login: async (code: string, password: string, deviceId?: string) => {
    const { login } = apiConfig;
    const resp = await processMiddlewareSendRequest({
      ...login,
      body: {
        code,
        password,
        deviceUid: deviceId,
      },
    });
    return resp.data;
  },
};
