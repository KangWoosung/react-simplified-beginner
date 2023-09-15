import { Link, useLoaderData } from "react-router-dom";
// import teamMembers from "./team-members.json";

const Navbar = () => {
  const teamMembers = useLoaderData();
  return (
    <>
      <ul>
        {teamMembers.map((teamMember) => (
          <li key={teamMember.id}>
            <Link to={teamMember.id.toString()}>{teamMember.name}</Link>
          </li>
        ))}
        <li>
          <Link to="new">New Team Member</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
