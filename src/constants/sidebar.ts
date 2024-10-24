import { pathNames } from "./pathname";

export const sidebarData: IMenuItem[] = [];

interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  hidden?: boolean;
  children?: IMenuItem[];
  permission?: string;
}
