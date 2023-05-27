import { Request } from "express";
import { IUser } from "./user.interface";

export interface RequestWithUser extends Request {
  user: IUser | any;
}

export interface IJwt {
  sub: string;
  iat: number;
  exp: number;
  role: string;
}