import { IReview } from './review.type';

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  isFeatured: boolean;
  featuredImage: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  reviews: IReview[];
}
