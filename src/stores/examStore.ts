import { create } from "zustand";
import { examService } from "../services/examService";
import { IHistoryExam, IJoinExam } from "../types/exam";

interface IState {
  exams: IHistoryExam[];
  total: number;
  submissions: any;
  currentExam: IJoinExam;
  joinExam: (id: number) => Promise<{ success: boolean; message: string }>;
  submitCode: (body: any) => Promise<void>;
  submitMultipleChoice: (body: any) => Promise<void>;
  getAll: (query?: any) => Promise<void>;
  submitExam: (examId: number) => Promise<boolean>;
}

const getStatus = (exam: IHistoryExam) => {
  if (!exam.startTime || !exam.endTime) {
    return "not-start";
  }

  if (exam.examLogs && exam.examLogs.length > 0 && exam.examLogs[0].endTime) {
    return "submitted";
  }

  const now = Date.now();

  if (
    now >= new Date(exam.startTime).getTime() &&
    now <= new Date(exam.endTime).getTime()
  ) {
    return "active";
  }

  return "expired";
};
export const useExamStore = create<IState>((set) => ({
  exams: [],
  total: 1,
  currentExam: {} as IJoinExam,
  submissions: {},
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
      const submissions: any = {};
      const currentExam = resp.data;
      currentExam.submissions.forEach((s) => {
        submissions[s.examQuestion.id] = {
          examId: id,
          answer: s.answer || s.code,
          languageId: s.languageId,
        };
      });

      console.log("submission", submissions);
      set((state) => ({ ...state, currentExam, submissions }));
      return { success: true, message: "" };
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message };
    }
  },
  submitCode: async (body) => {
    try {
      const resp = await examService.submitCode(body);
      set((state) => ({
        ...state,
        submissions: { ...state.submissions, [body.examQuestionId]: body },
      }));
      console.log("🚀 ~ submitCode: ~ resp:", resp);
    } catch (error) {
      console.log(error);
    }
  },
  submitMultipleChoice: async (body) => {
    try {
      const resp = await examService.submitMultipleChoice(body);
      set((state) => ({
        ...state,
        submissions: { ...state.submissions, [body.examQuestionId]: body },
      }));
      console.log("🚀 ~ submitMultipleChoice: ~ resp:", resp);
    } catch (error) {
      console.log(error);
    }
  },
  submitExam: async (examId) => {
    try {
      const resp = await examService.submitExam(examId);
      console.log("🚀 ~ submitExam: ~ resp:", resp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));
