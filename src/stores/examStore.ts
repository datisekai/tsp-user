import {create} from "zustand";
import {examService} from "../services/examService";
import {IHistoryExam, IJoinExam} from "../types/exam";

interface IState {
  exams: IHistoryExam[];
  total: number;
  submissions:any;
  currentExam: IJoinExam;
  joinExam: (id: number) => Promise<boolean>;
  submitCode: (body: any) => Promise<void>;
  submitMultipleChoice: (body: any) => Promise<void>;
  getAll: (query?: any) => Promise<void>;
}

const getStatus = (exam: IHistoryExam) => {
  if (!exam.startTime || !exam.endTime) {
    return "not-start";
  }

  const now = new Date();

  if (now < exam.startTime) {
    return "not-start";
  }
  if (now > exam.endTime) {
    return "expired";
  }

  return "active";
};
export const useExamStore = create<IState>((set) => ({
  exams: [],
  total: 1,
  currentExam:{} as IJoinExam,
  submissions:{},
  getAll: async (query) => {
    try {
      const resp = await examService.getAll(query);
      console.log("🚀 ~ getAll: ~ resp:", resp);

      set((state) => ({
        ...state,
        exams: resp.data.map((item: IHistoryExam) => ({
          ...item,
          status: getStatus(item),
        })),
        total: resp.total,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  joinExam: async (id) => {
    try {
      const resp = await examService.joinExam(id);
      console.log("🚀 ~ joinExam: ~ resp:", resp);
      set((state) => ({ ...state, currentExam: resp.data }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  submitCode: async (body) => {
    try {
      const resp = await examService.submitCode(body);
      set((state) => ({ ...state, submissions: {...state.submissions, [body.questionId]:body} }));
      console.log("🚀 ~ submitCode: ~ resp:", resp);
    } catch (error) {
      console.log(error);
    }
  },
  submitMultipleChoice: async (body) => {
    try {
      const resp = await examService.submitMultipleChoice(body);
      set((state) => ({...state, submissions: {...state.submissions, [body.questionId]: body}}));
      console.log("🚀 ~ submitMultipleChoice: ~ resp:", resp);
    } catch (error) {
      console.log(error);
    }
  }
}));
