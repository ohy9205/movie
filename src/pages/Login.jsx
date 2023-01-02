import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { createUser, loginUser } from "../api/firebase";
import Button from "../components/ui/Button";

export default function Login() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const title = isLogin ? "로그인" : "회원가입";
  const btnText = isLogin ? "로그인" : "가입하기";
  const selectText = isLogin ? "아직 가입을 안하셨나요?" : "로그인 하러가기";

  const toggleLogin = () => {
    setIsLogin((state) => !state);
    setError();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setError();
    setUser((state) => ({ ...state, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await (isLogin
      ? loginUser(user, setError)
      : createUser(user, setError));
    console.log(response);
    response &&
      (isLogin ? navigate("/") : setIsLogin(true) && alert("가입완료"));
    setIsLoading(false);
    setUser({});
  };

  return (
    <section>
      <h1>{title}</h1>
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
      <p onClick={toggleLogin}>{selectText}</p>
    </section>
  );
}
