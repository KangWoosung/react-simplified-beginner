/* 2023-09-19 01:41:10
axios 요청을 다양하게 인스턴스 받을 수 있도록 라이브러리화, 보일러플레이트 화 해본다.

1. axiosBase 가 원형 클래스 역할이고,
2. posts.js 에서, axiosBase 에 인스턴스하는 개별 펑션을 작성한다.
3. 최종 컴포넌트들, Posts754.jsx 등에서, loader 의 펑션코드를 
    return getPosts({ signal })
    이렇게 간소화하고,
4. router 에서, 이렇게 export 된 loader 를 사용하면 된다.

과정이 너무 복잡해진 것 같은데... 

*/

import axios from "axios";

export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
