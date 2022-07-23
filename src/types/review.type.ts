import { IUser } from './user.type';

export interface IReview {
  _id?: any;
  user: any;
  name: string;
  rating: number;
  comment: string;
}
