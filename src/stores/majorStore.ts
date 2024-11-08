import {create} from "zustand";
import {majorService} from "../services/majorService.ts";
import {IMajor} from "../types/major.ts";

interface IState {
    majors: IMajor[];
    getMe: (query?: any) => Promise<void>;
}

export const useMajorStore = create<IState>((set) => ({
    majors: [],
    getMe: async (query) => {
        try {
            const resp = await majorService.getMe(query);

            set((state) => ({
                ...state,
                majors: resp.data,
            }));
        } catch (error) {
            console.log(error);
        }
    },
}));
