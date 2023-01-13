import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import styles from "./SignForm.module.css";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../../store/auth/AuthContext";
import { useAuth } from "../../api/authService";

export default function SignForm({ isLogin }) {
  const { user: userInfo } = useAuthContext();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const btnText = isLogin ? "로그인" : "가입하기";

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    isLogin ? signIn(user, setError) : signUp(user, setError);

    setIsLoading(false);
    setUser({});
    emailRef.current.focus();
  };

  useEffect(() => {
    if (userInfo) {
      isLogin ? navigate("/") : navigate("/sign_in");
    }
  }, [userInfo, isLogin, navigate]);

  return (
    <div className={styles.sign}>
      <h1 className={styles.title}>{isLogin ? "로그인" : "회원가입"}</h1>
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
      <p className={styles.socialLogin} onClick={signInWithGoogle}>
        <span className={styles.socilLoginIcon}>
          <FcGoogle />
        </span>
        로그인 하러가기
      </p>
      <Link to={isLogin ? "/sign_up" : "/sign_in"} className={styles.link}>
        <p>{isLogin ? "아직 가입을 안하셨나요?" : "이미 가입하셨나요?"}</p>
      </Link>
    </div>
  );
}
