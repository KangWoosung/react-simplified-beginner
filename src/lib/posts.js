/* 2023-09-19 01:39:58
다수의 axios 요청 코드를 일원화 해서 관리할 수 있도록 정리해보자.

axiosBase 가, axios 인스턴스 클래스 역할을 하고,
개별 요청 펑션들을 여기서 만들어준다.
*/
import { axiosBase } from "./axiosBase";

export function getPosts(option) {
  return axiosBase.get("posts", option).then((res) => res.data);
}
export function getPost(postId, option) {
  console.log(`post/${postId}`);
  return axiosBase.get(`posts/${postId}`, option).then((res) => res.data);
}

// /posts?userId=<userId>
export function getPostsByUser(userId, option) {
  return axiosBase
    .get(`posts?userId=${userId}`, option)
    .then((res) => res.data);
}
