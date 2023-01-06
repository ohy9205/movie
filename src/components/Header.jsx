import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../api/firebase";
import { useAuthContext } from "../store/AuthContext";
import Button from "./ui/Button";

export default function Header({ pickCount }) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  const userExist = (
    <ul>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/my_pick">
          My pick <span>{pickCount}</span>
        </Link>
      </li>
      <li>
        <Button text="로그아웃" onClick={logoutUser} />
      </li>
    </ul>
  );

  const userNone = (
    <ul>
      <li>
        {pathname === "/sign_in" && (
          <Link to="/sign_up">
            <Button text="회원가입" />
          </Link>
        )}
        {pathname === "/sign_up" && (
          <Link to="/sign_in">
            <Button text="로그인" />
          </Link>
        )}
      </li>
    </ul>
  );

  return (
    <header style={{ display: "flex" }}>
      <Link to="/">
        <h1>Movyes</h1>
      </Link>
      <nav>
        {user && userExist}
        {!user && userNone}
      </nav>
    </header>
  );
}
