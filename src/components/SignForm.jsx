import React, { useState } from "react";
import Button from "./ui/Button";

export default function SignForm({ onSubmit, login, join }) {
  const [user, setUser] = useState({});
  let title;
  let btnText;
  if (login) {
    title = "로그인";
    btnText = "로그인하기";
  } else if (join) {
    title = "회원가입";
    btnText = "가입하기";
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const resetInput = () => {
    setUser({});
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>{title}</h1>
      <label htmlFor="userId">아이디</label>
      <input
        type="text"
        name="userId"
        id="userId"
        value={user.userId || ""}
        onChange={onChangeHandler}
      />
      <label htmlFor="userPassword">비밀번호</label>
      <input
        type="password"
        name="userPassword"
        id="userPassword"
        value={user.userPassword || ""}
        onChange={onChangeHandler}
        autoComplete="off"
      />
      <Button text={btnText} />
    </form>
  );
}
