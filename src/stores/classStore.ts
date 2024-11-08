import {create} from "zustand";
import {IClass} from "../types/class.ts";
import {classService} from "../services/classService.ts";

interface IState {
    classes: IClass[];
    getMe: (query?: any) => Promise<void>;
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
}));