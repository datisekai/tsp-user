import { LetterType } from "../types/letter";

export * from "./sidebar";
export * from "./modal";
export * from "./user";
export * from "./local-key";
export * from "./pathname";
export * from "./socket";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  CODE = "code",
  CODE_HTML = "code_html",
}

export const LetterTypeData: any = {
  [LetterType.LEAVE_APPLICATION]: "Đơn xin nghỉ",
};
