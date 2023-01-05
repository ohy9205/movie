import { Route, Routes } from "react-router";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Pick from "./pages/Pick";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my_pick" element={<Pick />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
