export interface IAttendance {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  title: string;
  isOpen: boolean;
  class: Class;
  user: User;
  secretKey: string;
  expirationTime: number;
}

export interface Class {
  id: number;
  name: string;
  major: Major;
  teachers: User[];
}

export interface Major {
  id: number;
  code: string;
  name: string;
}

export interface User {
  code: string;
  name: string;
}

export interface IAttendeeRoom {
  code: string;
  name: string;
  time: string;
}

export interface IRoomState {
  id: number;
  classId: number;
  qrCode: string; // Mã QR của phòng
  expirationTime: number; // Thời gian sống của mã QR
  lastGeneratedTime: number; // Thời gian tạo mã QR gần nhất
  attendees: IAttendeeRoom[];
  isOpen: boolean;
  secretKey: string;
}

export interface IAttendee {
  createdAt: Date;
  id: number;
  isSuccess: boolean;
  user: User2;
}

export interface User2 {
  code: string;
  email: null;
  phone: null;
  name: string;
}
