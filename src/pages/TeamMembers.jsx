import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
// import teamMembers from "../team-members.json";

const TeamMembers = () => {
  const { memberId } = useParams();
  const memberData = useLoaderData();
  console.log(memberData);
  useEffect(() => {
    // setTimeout(() => {
    //   console.log("TeamMembers.jsx 에서 setTimeout() 실행");
    //   console.log(teamMembers);
    //   const name = teamMembers.find((member) => member.id === memberId)?.name;
    // }, 1000);
  }, []);
  // const name = memberData;
  return (
    <>
      <h1>TeamMembers</h1>
      <p>TeamMembers 페이지 입니다.</p>
      <p>{memberId} 입니다.</p>
      <p>{memberData.name} 입니다.</p>
      <p>{`// RES 로 넘겨주는 정보는 memberId 하나 뿐이다. 모든 RES 가 그렇듯이..
          // TeamMembers.jsx 에서 memberId 에 근거하여, Json 에서 필요정보를 찾아내야 한다.`}</p>
    </>
  );
};

export default TeamMembers;
