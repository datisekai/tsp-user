import { create } from "zustand";
import { IClass } from "../types/class.ts";
import { classService } from "../services/classService.ts";

interface IState {
  classes: IClass[];
  getMe: (query?: any) => Promise<void>;
  join: (secretKey: string) => Promise<boolean>;
}

export const useClassStore = create<IState>((set) => ({
  classes: [],
  getMe: async (query) => {
    try {
      const resp = await classService.getMe(query);

      set((state) => ({
        ...state,
        classes: resp.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  join: async (secretKey) => {
    try {
      const resp = await classService.join(secretKey);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));
