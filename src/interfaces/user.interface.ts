export interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  group: string;
  score: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}