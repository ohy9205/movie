import React, { useState } from "react";
import Button from "./ui/Button";

export default function SignForm({ onSubmit, isLogin }) {
  const [user, setUser] = useState({});
  const btnText = isLogin ? "로그인하기" : "가입하기";

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler}>
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
