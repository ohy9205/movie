import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../store/auth/AuthContext";
import Button from "./ui/Button";
import { MdMovieFilter } from "react-icons/md";
import styles from "./Header.module.css";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useAuth } from "../api/authService";

export default function Header({ pickCount }) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const userExist = (
    <>
      <li>
        <Link to="/search">검색</Link>
      </li>
      <li>
        <Link to="/my_pick" className={styles.pick}>
          <BsEmojiHeartEyes className={styles.pickIcon} />
          <span className={styles.count}>{pickCount}</span>
        </Link>
      </li>
      <li>
        <Link to="/community">커뮤니티</Link>
      </li>
      <li className={styles.profile}>
        {user && user.email}
        <Button text="로그아웃" onClick={logout} />
      </li>
    </>
  );

  const userNone = (
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
  );

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.titleBox}>
          <MdMovieFilter className={styles.titleIcon} />

          <h1 className={styles.title}>Movyes</h1>
        </Link>
        <ul className={styles.nav}>
          {user && userExist}
          {!user && userNone}
        </ul>
      </div>
    </header>
  );
}
