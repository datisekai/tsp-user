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
