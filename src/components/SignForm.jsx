import React, { useState } from "react";
import Button from "./ui/Button";

export default function SignForm({ onSubmit, login, join }) {
  const [user, setUser] = useState({});
  const title = (login && "로그인") || (join && "회원가입");
  const btnText = (login && "로그인하기") || (join && "가입하기");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>{title}</h1>
      <input
        type="text"
        name="userId"
        value={user.userId || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="아이디"
      />
      <input
        type="password"
        name="userPassword"
        value={user.userPassword || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="비밀번호"
      />
      <Button text={btnText} />
    </form>
  );
}
