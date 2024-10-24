import { create } from "zustand";
import { localKey } from "../constants";
import { AuthService } from "../services";
import { getObjectLocalData, setObjectLocalData } from "../utils";
import { useUserStore } from "./userStore";

interface IState {
  token: string;
  login: (code: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<IState>((set) => ({
  token: getObjectLocalData(localKey.TOKEN) || "",
  login: async (code: string, password: string) => {
    const result = await AuthService.login(code, password);
    if (result) {
      const token = result.accessToken;
      setObjectLocalData(localKey.TOKEN, token);
      set((state) => ({ ...state, token }));
      useUserStore.getState().getMe();
    }

    return !!result;
  },
}));
