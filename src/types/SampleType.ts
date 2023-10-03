/* 2023-10-02 12:56:22
GPT 가 보여준, 실사용 예제 타입 정의 파일
Thes Types are not used in this project.
AppTypes.ts

*/

// 사용자 정보를 나타내는 타입
export interface User {
  id: number;
  name: string;
  email: string;
}

// 포스트 정보를 나타내는 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

// 앱 상태 관리를 위한 Redux 스토어 타입
export interface AppState {
  user: User | null; // 현재 로그인한 사용자 정보
  posts: Post[]; // 포스트 목록
  loading: boolean; // 데이터 로딩 상태
  error: string | null; // 오류 메시지
}

// 사용자의 로그인 상태를 표현하는 열거형 타입
export enum AuthStatus {
  LoggedIn = "loggedIn",
  LoggedOut = "loggedOut",
  Loading = "loading",
}

// 사용자 인증 정보를 저장하는 컨텍스트 타입
export interface AuthContextType {
  user: User | null;
  authStatus: AuthStatus;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// API 응답 형식을 나타내는 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
