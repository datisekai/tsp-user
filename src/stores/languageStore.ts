import { create } from "zustand";
import { languageService } from "../services/languageService.ts";

interface IState {
  languages: any[];
  getAll: () => Promise<void>;
}

export const useLanguageStore = create<IState>((set, get) => ({
  languages: [],
  getAll: async () => {
    try {
      const resp = await languageService.getAll();

      set((state) => ({
        ...state,
        languages: resp.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
