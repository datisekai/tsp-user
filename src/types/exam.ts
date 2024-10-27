export interface IHistoryExam {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  class: Class;
  status?: "active" | "not-start" | "expired";
  submissions: Submission[];
}

interface Class {
  id: number;
  name: string;
  major: Major;
  teachers: Teacher[];
}

interface Major {
  id: number;
  code: string;
  name: string;
}

interface Teacher {
  id: number;
  name: string;
}

interface Submission {
  createdAt: Date;
  id: number;
  user: User;
}

interface User {
  id: number;
}

export interface IJoinExam {
  createdAt: string
  updatedAt: string
  id: number
  title: string
  description?: string
  startTime: string
  endTime: string
  questions: IQuestion[]
  class: Class
}

export interface IQuestion {
  createdAt: string
  updatedAt: string
  id: number
  title: string
  content: string
  type: string
  isPublic: boolean
  choices: Choice[]
  acceptedLanguages: number[]
  initCode: any;
}

export interface Choice {
  text: string
}


export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  CODE = "code",
}
