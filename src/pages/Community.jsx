import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useAuthContext } from "../store/AuthContext";

export default function Community() {
  const { user } = useAuthContext();
  const [isNew, setIsNew] = useState(false);

  const toggleIsNew = () => {
    setIsNew((state) => !isNew);
  };

  return (
    <section>
      <h1>Community</h1>
      {/* 트위터 형태로 */}
      <Button text="글 작성" />
      <article>
        <h2>{user.email}</h2>
        <time>15시간전</time>
        <p>글내용</p>
      </article>
    </section>
  );
}
