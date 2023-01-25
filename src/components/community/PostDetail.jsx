import React, { useState } from "react";
import { useAuthContext } from "../../store/auth/AuthContext";
import PostModal from "./PostModal";
import styles from "./PostDetail.module.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";

export const EDIT = "edit";
export const DELETE = "delete";

export default function PostDetail() {
  const { user } = useAuthContext();
  const [showDelete, setShowDelete] = useState(false);
  const location = useLocation();
  const post = location.state.post;

  const toggleShowDelete = () => {
    setShowDelete((showDelete) => !showDelete);
  };

  return (
    <div className={styles.postDetail}>
      <p className={styles.title}>{post.title}</p>
      <p className={styles.auth}>{post.auth}</p>
      <time
        className={styles.time}
        dateTime={new Date(parseInt(post.createdAt)).toLocaleDateString()}>
        {new Date(parseInt(post.createdAt)).toLocaleDateString()}
      </time>
      <p className={styles.content}>
        {post.content}

        {post.imageUrl && post.imageUrl.length > 0 && (
          <a
            href={post.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.attachment}>
            <img src={post.imageUrl} alt="첨부" />
          </a>
        )}
      </p>

      {user.email === post.auth && (
        <div className={styles.menu}>
          <Button text="삭제하기" onClick={toggleShowDelete} cancle />
          <Link
            to={`/community/edit/${post.id}`}
            state={{ post, isEdit: true }}>
            <Button text="수정하기" />
          </Link>
        </div>
      )}

      {showDelete && (
        <PostModal type={DELETE} toggleDelete={toggleShowDelete} post={post} />
      )}
    </div>
  );
}
