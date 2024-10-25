export interface INotification {
  createdAt: string;
  id: number;
  name: string;
  content: string;
  classes: IClass[];
  image?: string;
}

interface IClass {
  id: number;
  name: string;
  major: IMajor;
}

interface IMajor {
  id: number;
  name: string;
}
