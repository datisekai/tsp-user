import {apiConfig, processMiddlewareSendRequest} from "../apis";

const {major} = apiConfig;
export const majorService = {
    getMe: async (query: any) => {
        const {getMe} = major;
        return processMiddlewareSendRequest({...getMe, body: query});
    },
};
