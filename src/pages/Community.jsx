import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NewPost from "../components/community/NewPost";
import PostList from "../components/community/PostList";
import Button from "../components/ui/Button";
import { useAuthContext } from "../store/AuthContext";
import { getPostListFetch } from "../store/community-actions";
import { communityAction } from "../store/community-slice";

export default function Community() {
  const { user } = useAuthContext();
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
