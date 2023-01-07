import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewPost from "../components/community/NewPost";
import PostList from "../components/community/PostList";
import { getPostListFetch } from "../store/community-actions";

export default function Community() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostListFetch());
  }, [dispatch]);

  return (
    <section>
      <h1>Community</h1>
      <NewPost />
      <PostList />
    </section>
  );
}
