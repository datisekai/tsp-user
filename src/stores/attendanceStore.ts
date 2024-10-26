import { create } from "zustand";
import { attendanceService } from "../services/attendanceService";
import { IHistoryAttendance } from "../types/attendance";

interface IState {
  attendances: IHistoryAttendance[];
  total: number;
  getAll: (query?: any) => Promise<void>;
}

export const useAttendanceStore = create<IState>((set) => ({
  attendances: [],
  total: 1,
  getAll: async (query) => {
    try {
      const resp = await attendanceService.getAll(query);

      set((state) => ({
        ...state,
        attendances: resp.data,
        total: resp.total,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
