import { useOutletContext } from "react-router-dom";

const Team = () => {
  const value = useOutletContext();
  return (
    <>
      <h1>Team - {value}</h1>
      <p>Team 페이지 입니다.</p>
    </>
  );
};

export default Team;
