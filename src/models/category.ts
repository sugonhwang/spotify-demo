import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface GetCategoryRequest {
  country?: string;
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface GetCategoryResponse {
  categories: ApiResponse<Category>;
}
