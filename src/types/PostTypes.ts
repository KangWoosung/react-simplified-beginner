/* 2023-10-02 13:03:52

*/

export interface PostType {
  userId: string;
  id: number;
  title: string;
  body: string;
}
export interface PostsType {
  posts: PostType[];
}
