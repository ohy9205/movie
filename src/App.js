import { Route, Routes } from "react-router";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Pick from "./pages/Pick";
import { useAuthContext } from "./store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPickFetch } from "./store/pick-actions";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my_pick" element={<Pick movies={pickMovies} />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
