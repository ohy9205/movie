import { useState } from "react";
import SignForm from "../components/SignForm";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const title = isLogin ? "로그인" : "회원가입";

  const toggleLogin = () => {
    setIsLogin((state) => !state);
  };

  return (
    <section>
      <h1>{title}</h1>
      {<SignForm isLogin={isLogin} />}
      <p onClick={toggleLogin}>
        {isLogin ? "아직 가입을 안하셨나요?" : "로그인 하러가기"}
      </p>
    </section>
  );
}
