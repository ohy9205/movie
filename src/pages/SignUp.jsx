import { Link } from "react-router-dom";
import SignForm from "../components/SignForm";

export default function Login() {
  return (
    <section>
      <h1>회원가입</h1>
      {<SignForm />}

      <Link to="/login">
        <p>로그인 하러가기</p>
      </Link>
    </section>
  );
}
