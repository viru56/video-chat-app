export interface Iuser {
  id?: string;
  socketId?:string;
  firstName: string;
  lastName: string;
  email: string;
  loginStatus?: string;
  isLoggedIn?: boolean;
  lastLoggedIn?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
