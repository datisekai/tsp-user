export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: number;
  code: string;
  email?: string;
  phone?: string;
  active: boolean;
  name: string;
  avatar?: string;
  deviceUid?: string;
  type: string;
  role: IRole;
}

export interface IRole {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  permissions: IPermission[];
}

export interface IPermission {
  createdAt: string;
  updatedAt: string;
  id: number;
  action: string;
  resource: string;
}
