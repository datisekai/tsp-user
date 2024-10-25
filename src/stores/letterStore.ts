import { create } from "zustand";
import { letterService } from "../services/letterService";

interface IState {
  letters: any[];
  total: number;
  getAll: (query?: any) => Promise<void>;
  create: (body: any) => Promise<boolean>;
  _delete: (id: number) => Promise<boolean>;
}

export const useLetterStore = create<IState>((set, get) => ({
  letters: [],
  total: 1,
  getAll: async (query) => {
    try {
      const resp = await letterService.getAll(query);
      console.log("🚀 ~ getAll: ~ resp:", resp);

      set((state) => ({
        ...state,
        letters: resp.data,
        total: resp.total,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  create: async (body) => {
    try {
      const response = await letterService.create(body);
      return !!response;
    } catch (err) {
      console.log("🚀 ~ create: ~ err:", err);
      return false;
    }
  },
  _delete: async (id: number) => {
    try {
      const response = await letterService.delete(id);
      get().getAll();
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
