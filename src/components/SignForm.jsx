import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { createUser, loginUser } from "../api/firebase";
import Button from "./ui/Button";

export default function SignForm({ isLogin }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  const btnText = isLogin ? "로그인" : "가입하기";

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await (isLogin
      ? loginUser(user, setError)
      : createUser(user, setError));

    response && (isLogin ? navigate("/") : navigate("/login"));
    setIsLoading(false);
    setUser({});
    emailRef.current.focus();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        ref={emailRef}
        type="email"
        name="email"
        value={user.email || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="아이디"
        required
      />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        value={user.password || ""}
        onChange={onChangeHandler}
        autoComplete="off"
        placeholder="비밀번호"
        minLength="6"
        required
      />
      {!isLoading && <Button text={btnText} />}
      {isLoading && <p>Sending request...</p>}
      {error && <p>{error}</p>}
    </form>
  );
}
