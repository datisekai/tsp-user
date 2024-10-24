import { create } from "zustand";
import { UserService } from "../services/userService";
import { IUser } from "../types/user";

interface IState {
  user: IUser;
  getMe: () => Promise<void>;
}

export const useUserStore = create<IState>((set) => ({
  user: {} as IUser,
  users: [],
  isLoadingUsers: false,
  total: 0,
  getMe: async () => {
    try {
      const resp = await UserService.getMe();
      const user = resp.user as IUser;

      set((state) => ({ ...state, user }));
    } catch (error) {
      console.log(error);
    }
  },
}));
