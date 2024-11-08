import {apiConfig, processMiddlewareSendRequest} from "../apis";

export const classService = {
    getMe: async (query: any) => {
        const {getMe} = apiConfig.class;
        return processMiddlewareSendRequest({...getMe, body: query});
    },
};
