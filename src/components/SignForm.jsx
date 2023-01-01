import React, { useState } from "react";
import { createUser, loginUser } from "../api/firebase";
import Button from "./ui/Button";

export default function SignForm({ onSubmit, isLogin }) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState();
  const btnText = isLogin ? "로그인" : "가입하기";

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    isLogin ? loginUser(user, setMessage) : createUser(user, setMessage);
    setUser({});
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="email"
        name="email"
        value={user.email || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="아이디"
      />
      <input
        type="password"
        name="password"
        value={user.password || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="비밀번호"
        minLength="6"
      />
      <Button text={btnText} />
      <p>{setMessage && message}</p>
    </form>
  );
}
