import { pathNames } from "./pathname";

export const sidebarData: IMenuItem[] = [
  {
    title: "Thông báo",
    icon: "pi pi-bell",
    path: pathNames.NOTIFICATION,
  },
  {
    title: "Đơn từ",
    icon: "pi pi-book",
    path: pathNames.LETTER,
  },
  {
    title: "Điểm danh",
    icon: "pi pi-users",
    path: pathNames.ATTENDANCE,
  },
  // {
  //   title: "Bảng điểm",
  //   icon: "pi pi-face-smile",
  //   path: pathNames.GRADE,
  // },
  {
    title: "Kiểm tra",
    icon: "pi pi-bolt",
    path: pathNames.EXAM,
  },
];

export const sidebarBottom: IMenuItem[] = [
  {
    title: "Tài khoản",
    icon: "pi pi-user",
    path: pathNames.PROFILE,
  },
  {
    title: "Đăng xuất",
    icon: "pi pi-sign-out",
    path: pathNames.LOGOUT,
  },
];

interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  hidden?: boolean;
  children?: IMenuItem[];
  notify?: boolean;
}
