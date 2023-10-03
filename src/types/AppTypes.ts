/* 2023-10-02 13:00:40

*/

import { UserType } from "./UserTypes";
import { PostsType } from "./PostTypes";
import { PostType } from "./PostTypes";

export interface LoaderType {
  users?: UserType[];
  posts?: PostsType[];
  post?: PostType;
  maxId?: number;
}

export interface LoaderFuncType extends LoaderType {
  params?: any;
  request?: any;
}
