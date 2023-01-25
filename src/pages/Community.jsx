import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PostList from "../components/community/PostList";
import Button from "../components/ui/Button";
import { getPostListFetch } from "../store/community/community-actions";
import styles from "./Community.module.css";

export default function Community() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostListFetch());
  }, [dispatch]);

  return (
    <section className={styles.community}>
      <Link to="/community/new" className={styles.newPostBtn}>
        <Button text="새 글 작성" />
      </Link>

      <PostList />
    </section>
  );
}
