import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewPost from "../components/community/NewPost";
import PostList from "../components/community/PostList";
import { getPostListFetch } from "../store/community/community-actions";
import styles from "./Community.module.css";

export default function Community() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostListFetch());
  }, [dispatch]);

  return (
    <section className={styles.community}>
      {/* <h1>Community</h1> */}
      <section className={styles.newPost}>
        <NewPost />
      </section>
      <section className={styles.postList}>
        <PostList />
      </section>
    </section>
  );
}
