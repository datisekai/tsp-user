import { create } from "zustand";
import { localKey } from "../constants";
import { AuthService } from "../services";
import {
  getDeviceId,
  getObjectLocalData,
  removeLocalItem,
  setObjectLocalData,
} from "../utils";
import { useUserStore } from "./userStore";

interface IState {
  token: string;
  login: (code: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<IState>((set) => ({
  token: getObjectLocalData(localKey.TOKEN) || "",
  login: async (code: string, password: string) => {
    const deviceId = await getDeviceId();
    try {
      const result = await AuthService.login(
        code,
        password,
        deviceId as string
      );
      if (result) {
        const token = result.accessToken;
        setObjectLocalData(localKey.TOKEN, token);
        set((state) => ({ ...state, token }));
        useUserStore.getState().getMe();
      }

      return !!result;
    } catch (error) {
      return false;
    }
  },
  logout: () => {
    removeLocalItem(localKey.TOKEN);
    set((state) => ({ ...state, token: "" }));
  },
}));
