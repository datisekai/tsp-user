export interface IHistoryExam {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    class: Class;
    status?: "active" | "not-start" | "expired";
    submissions: Submission[];
    examLogs: { startTime: Date, endTime: Date }[]
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
    createdAt: string;
    updatedAt: string;
    id: number;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    examQuestions: IExamQuestion[];
    submissions: ISubmission[];
}

export interface IExamQuestion {
    createdAt: string;
    updatedAt: string;
    id: number;
    score: number;
    question: Question;
}

interface Question {
    id: number;
    title: string;
    content: string;
    type: string;
    choices: Choice[];
    acceptedLanguages?: string[];
    initCode?: { [key: string]: string };
    testCases: TestCase[];
}

interface Choice {
    text: string;
}

interface ISubmission {
    createdAt: string;
    updatedAt: string;
    id: number;
    languageId?: any;
    code?: any;
    answer: string;
    resultJudge0?: any;
    grade: number;
    examQuestion: { id: number };
}

interface TestCase {
    id: number;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
    grade: number;
}

export interface IRunCodeResult {
    stdout: any
    time: any
    memory: any
    stderr: any
    token: string
    compile_output: string
    message: any
    status: IStatus
}

interface IStatus {
    id: number
    description: string
}

export interface IHistoryExam {
    id: number
    languageId: any
    code: any
    answer: string
    resultJudge0: any
    questionTemp: QuestionTemp
    grade: number
    examQuestion: ExamQuestion
    showResult: boolean
}

export interface QuestionTemp {
    createdAt: string
    updatedAt: string
    id: number
    title: string
    content: string
    type: string
    isPublic: boolean
    choices: HChoice[]
    acceptedLanguages: any
    initCode: HInitCode
    testCases: any[]
}

export interface HChoice {
    text: string
    isCorrect: boolean
}

export interface HInitCode {
}

export interface ExamQuestion {
    id: number
}
