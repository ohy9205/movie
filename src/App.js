import { Outlet } from "react-router";

import Header from "./components/Header";
import { useAuthContext } from "./store/auth/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPickFetch } from "./store/pick/pick-actions";

function App() {
  const { user } = useAuthContext();
  const dispathch = useDispatch();
  const pickMovies = useSelector((state) => state.pick.pick);

  useEffect(() => {
    user && dispathch(getPickFetch(user.uid));
  }, [user, dispathch]);

  return (
    <>
      <Header pickCount={pickMovies.length} />
      <Outlet />
    </>
  );
}

export default App;
