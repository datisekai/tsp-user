import {apiConfig, processMiddlewareSendRequest} from "../apis";

const {exam} = apiConfig;
export const examService = {
    getAll: async (query: any) => {
        const {getAll} = exam;
        return processMiddlewareSendRequest({...getAll, body: query});
    },
    joinExam: async (id: number) => {
        const {join} = exam;
        return processMiddlewareSendRequest({
            ...join,
            endpoint: join.endpoint.replace(":id", id.toString()),
        });
    },
    submitCode: async (body: any) => {
        const {submitCode} = exam;
        return processMiddlewareSendRequest({
            ...submitCode,
            body,
        });
    },
    submitMultipleChoice: async (body: any) => {
        const {submitMultiChoice} = exam;
        return processMiddlewareSendRequest({
            ...submitMultiChoice,
            body,
        });
    },
    submitExam: async (examId) => {
        const {submitExam} = exam
        return processMiddlewareSendRequest({
            ...submitExam,
            endpoint: submitExam.endpoint.replace(":id", examId.toString()),
        });
    },
    runTestCode: async (body: any) => {
        const {runTestCode} = exam;
        return processMiddlewareSendRequest({
            ...runTestCode,
            body,
        });
    },
    getHistory: async (examId: number) => {
        const {getHistory} = exam;
        return processMiddlewareSendRequest({
            ...getHistory,
            endpoint: getHistory.endpoint.replace(":id", examId.toString())
        });
    },
    getTakeOrder: async (examId: number) => {
        const {getTakeOrder} = exam;
        return processMiddlewareSendRequest({
            ...getTakeOrder,
            endpoint: getTakeOrder.endpoint.replace(":id", examId.toString())
        });
    },
};
