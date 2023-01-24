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
      <p>자유롭게 의견을 나눠보세요.</p>
      <Link to="/community/new">
        <Button text="새 글 작성" />
      </Link>

      <PostList />
    </section>
  );
}
