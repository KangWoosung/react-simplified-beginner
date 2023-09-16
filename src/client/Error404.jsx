import React from "react";
// import { useLoaderData, useNavigation } from "react-router-dom";

export default function Error404() {
  //   const { state: loadingState } = useNavigation();
  //   const { user, posts, todos } = useLoaderData();

  let loadingClass = "loading";
  //   loadingState === "loading"
  //     ? (loadingClass += " active")
  //     : (loadingClass = "");
  return (
    <div className={`container   `}>
      <h1>Error 404</h1>
    </div>
  );
}
