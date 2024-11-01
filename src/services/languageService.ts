import {apiConfig, processMiddlewareSendRequest} from "../apis";

const {language} = apiConfig
export const languageService = {
    getAll: async () => {
      const { getAll } = language;
      return processMiddlewareSendRequest({ ...getAll});
    }
}