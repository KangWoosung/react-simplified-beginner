/* 2023-09-19 01:39:58
다수의 axios 요청 코드를 일원화 해서 관리할 수 있도록 정리해보자.

axiosBase 가, axios 인스턴스 클래스 역할을 하고,
개별 요청 펑션들을 여기서 만들어준다.
*/
import { axiosBase } from "./axiosBase";

export function getTodos(option) {
  return axiosBase.get("todos", option).then((res) => res.data);
}

// /todos?userId=<userId>
export function getTodosByUser(userId, option) {
  return axiosBase
    .get(`todos?userId=${userId}`, option)
    .then((res) => res.data);
}
