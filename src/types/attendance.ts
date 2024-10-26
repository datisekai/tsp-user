export interface IHistoryAttendance {
  createdAt: Date;
  id: number;
  attendance: Attendance;
}

interface Attendance {
  createdAt: Date;
  class: Class;
}

interface Class {
  name: string;
  major: Major;
  teachers: Major[];
}

interface Major {
  code: string;
  name: string;
}
