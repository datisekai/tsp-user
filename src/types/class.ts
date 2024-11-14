export interface IClass {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    duration: any
    major: {
        code: string,
        name: string
    }
}
