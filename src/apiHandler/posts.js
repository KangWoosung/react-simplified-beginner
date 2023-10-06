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

//  2023-09-24 15:30:59
//  filtered 펑션을 추가한다.
//  GET /posts?q=<query>&userId=<userId>
export function getPostsByFilter(filter, option) {
  const { query, userId } = filter;
  console.log(`posts?q=${query}&userId=${userId}`);
  let apiUri = "";
  (query !== "" && query != null) || (userId !== "" && userId != null)
    ? (apiUri += "?")
    : "";
  query !== "" && query != null ? (apiUri += `q=${query}`) : "";
  userId !== "" && userId != null ? (apiUri += `&userId=${userId}`) : "";
  return axiosBase
    .get(`posts${apiUri}`, option)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}

//  2023-09-24 12:11:00
//  axios post 펑션을 추가한다.
//  POST /posts - Create a new post
export function addPost(postData, option) {
  return axiosBase
    .post("posts", postData, option)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}

//  PUT /posts/:id - Update a post
export function updatePost(postData, option) {
  return axiosBase
    .put(`posts/${postData.id}`, postData, option)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}

//  DELETE /posts/:id - Delete a post
export function deletePost(postId, option) {
  return axiosBase
    .delete(`posts/${postId}`, option)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
