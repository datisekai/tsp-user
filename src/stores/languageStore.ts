import {create} from "zustand";
import {languageService} from "../services/languageService.ts";

interface IState {
   languages:any[],
    getAll: () => Promise<void>
}

export const useLanguageStore = create<IState>((set, get) => ({
    languages: [],
    getAll: async () => {
        try {
            const resp = await languageService.getAll();
            console.log("🚀 ~ getAll: ~ resp:", resp);

            set((state) => ({
                ...state,
                languages: resp.data,
            }));
        } catch (error) {
            console.log(error);
        }
    },
}));
