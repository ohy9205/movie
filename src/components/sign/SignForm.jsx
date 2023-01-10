import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createUser, loginUser } from "../../api/firebase";
import Button from "../ui/Button";
import styles from "./SignForm.module.css";

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

    if (response) {
      isLogin ? navigate("/") : navigate("/sign_in");
      return;
    }
    setIsLoading(false);
    setUser({});
    emailRef.current.focus();
  };

  return (
    <div className={styles.sign}>
      <h1>{isLogin ? "로그인" : "회원가입"}</h1>
      <form className={styles.signForm} onSubmit={onSubmitHandler}>
        <div className={styles.inputBox}>
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={user.email || ""}
            onChange={onChangeHandler}
            autoComplete="off"
            placeholder="이메일"
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
        </div>
        {!isLoading && <Button text={btnText} />}
        {isLoading && <p>Sending request...</p>}
        {error && <p>{error}</p>}
      </form>

      <Link to={isLogin ? "/sign_up" : "/sign_in"}>
        <p>{isLogin ? "아직 가입을 안하셨나요?" : "이미 가입하셨나요?"}</p>
      </Link>
    </div>
  );
}
