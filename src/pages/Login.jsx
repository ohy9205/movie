import { Link } from "react-router-dom";
import SignForm from "../components/sign/SignForm";

export default function Login() {
  return (
    <section>
      <h1>로그인</h1>
      {<SignForm isLogin />}

      <Link to="/signup">
        <p>아직 가입을 안하셨나요?</p>
      </Link>
    </section>
  );
}
