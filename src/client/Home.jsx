import { useNavigation } from "react-router-dom";

export default function Home() {
  const { state: loadingState } = useNavigation();
  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");
  return (
    <>
      <div className={`container  ${loadingClass} `}>
        <h1>Home</h1>
        <p>Home 페이지 입니다.</p>
        <ul className="list">
          <li>내일은 감자볶음</li>
          <li>모래는 감자찜</li>
        </ul>
        <div>
          업데이트 작업 후에, gitHub 에 main 브랜치에 push 하면,
          <br />
          Vercel 에서 자동으로 업데이트를 적용해준다.
          <br />
          와... 신세계...ㄷㄷㄷ
        </div>
      </div>
    </>
  );
}
