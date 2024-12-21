import { create } from "zustand";

export interface IAction {
  title?: string;
  icon?: string;
  onClick?: () => void;
  type?: "button" | "file";
  disabled?: boolean;
  iconPos?: "right" | "left";
  severity?: "success" | "info" | "warning" | "danger" | "help" | "secondary";
  loading?: boolean;
  action?: "back";
  tooltip?: string;
}

interface ICommonState {
  isLoadingApi: boolean;
  header: {
    title: string;
    actions: IAction[];
  };
  footer: {
    actions: IAction[];
  };
  isLoadingUpload: {
    [key: string]: boolean;
  };
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: IAction[]) => void;
  setFooterActions: (actions: IAction[]) => void;
  setLoading: (isLoading: boolean) => void;
  setLoadingUpload: (key: string, isLoading: boolean) => void;
  resetActions: () => void;
  setLocation: (location: { latitude?: number; longitude?: number }) => void;
  location: { latitude?: number; longitude?: number };
}

export const useCommonStore = create<ICommonState>((set) => ({
  isLoadingApi: false,
  header: {
    title: "Dashboard",
    actions: [],
  },
  footer: {
    actions: [],
  },
  isLoadingUpload: {},
  modal: {
    visible: false,
    footer: "",
    header: "",
  },
  location: {
    latitude: 0,
    longitude: 0,
  },
  setHeaderTitle: (title: string) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        title,
      },
    }));
  },
  setHeaderActions: (actions: IAction[]) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        actions,
      },
    }));
  },
  setFooterActions: (actions: IAction[]) => {
    set((state) => ({
      ...state,
      footer: {
        ...state.footer,
        actions: actions,
      },
    }));
  },
  setLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoadingApi: isLoading }));
  },
  setLoadingUpload: (key: string, isLoading: boolean) => {
    set((state) => ({
      ...state,
      isLoadingUpload: { ...state.isLoadingUpload, [key]: isLoading },
    }));
  },
  resetActions: () => {
    set((state) => ({
      ...state,
      header: { ...state.header, actions: [] },
      footer: { ...state.footer, actions: [] },
    }));
  },
  setLocation: (location) => {
    set((state) => ({
      ...state,
      location,
    }));
  },
}));
