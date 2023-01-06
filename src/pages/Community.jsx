import React, { useState } from "react";
import NewPost from "../components/community/NewPost";
import PostList from "../components/community/PostList";
import Button from "../components/ui/Button";
import { useAuthContext } from "../store/AuthContext";

export default function Community() {
  const { user } = useAuthContext();

  return (
    <section>
      <h1>Community</h1>
      <NewPost />
      <PostList />
      {/* <article>게시글 목록</article> */}
    </section>
  );
}
