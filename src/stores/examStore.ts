import { create } from "zustand";
import { examService } from "../services/examService";
import { IHistoryExam } from "../types/exam";

interface IState {
  exams: IHistoryExam[];
  total: number;
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
}));
