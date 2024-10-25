import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { INotification } from "../types/notification";

interface IState {
  notifications: INotification[];
  total: number;
  getAll: (query?: any) => Promise<void>;
}

export const useNotificationStore = create<IState>((set) => ({
  notifications: [],
  total: 1,
  getAll: async (query) => {
    try {
      const resp = await notificationService.getAll(query);
      console.log("🚀 ~ getAll: ~ resp:", resp);

      set((state) => ({
        ...state,
        notifications: resp.data,
        total: resp.total,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
