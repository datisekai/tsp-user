import { create } from "zustand";
import { assignPermissions, users } from "../constants";
import { AuthService } from "../services";
import { IUser } from "../types/user";
import { UserService } from "../services/userService";

interface IState {
  user: IUser;
  permissions: string[];
  users: IUser[];
  total: number;
  isLoadingUsers: boolean;
  fetchUsers: (body: object) => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  addUser: (user: IUser) => Promise<boolean>;
  updateUser: (id: number, updateduser: IUser) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  getMe: () => Promise<void>;
}
interface IToast {
  message?: string;
  severity?:
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "contrast";
  summary?: string;
  life?: number;
}

export const useUserStore = create<IState>((set) => ({
  user: {} as IUser,
  permissions: [],
  users: [],
  isLoadingUsers: false,
  total: 0,
  getMe: async () => {
    try {
      const resp = await UserService.getMe();
      const user = resp.user as IUser;
      const permissions = user.role.permissions.map(
        (item) => `${item.resource}:${item.action}`
      );

      set((state) => ({ ...state, user, permissions }));
    } catch (error) {
      console.log(error);
    }
  },
  fetchUsers: async (body) => {
    try {
      const response = await UserService.getAll(body);
      set({ users: response.data, total: response.total });
    } catch (error) {}
  },

  fetchUser: async (id: string) => {
    try {
      const response = await UserService.getSingle(id);
      set({ user: response });
    } catch (error) {}
  },

  addUser: async (data: IUser) => {
    try {
      const response = await UserService.create(data);
      if (response) {
        set((state) => ({
          users: [response, ...state.users],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateUser: async (id: number, updateItem: IUser) => {
    try {
      const response = await UserService.update(id, updateItem);
      if (response) {
        set((state) => ({
          users: state.users.map((item) => (item.id === id ? response : item)),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteUser: async (id: number) => {
    try {
      const response = await UserService.delete(id);
      if (response) {
        set((state) => ({
          users: state.users.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
