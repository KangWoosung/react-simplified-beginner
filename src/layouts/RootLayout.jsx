import {
  Outlet,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import Navbar from "../client/Navbar";

export function RootLayout() {
  const { state } = useNavigation();
  const loadingState = state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {loadingState && <div className="loading-spinner"></div>}
      <div className={`container ${loadingState} ? "loading" : "" `}>
        <Outlet />
      </div>
    </>
  );
}
