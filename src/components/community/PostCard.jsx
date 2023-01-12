import React, { useState } from "react";
import { useAuthContext } from "../../store/auth/AuthContext";
import PostModal from "./PostModal";
import styles from "./PostCard.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Card from "../../components/ui/Card";

export const EDIT = "edit";
export const DELETE = "delete";

export default function PostCard({ post }) {
  const { user } = useAuthContext();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleShowEdit = () => {
    setShowEdit((showEdit) => !showEdit);
  };

  const toggleShowDelete = () => {
    setShowDelete((showDelete) => !showDelete);
  };

  return (
    <>
      <Card className={styles.postCard}>
        <div className={styles.headerBox}>
          <h1>{post.auth}</h1>
          {user.email === post.auth && (
            <div className={styles.menu}>
              <BiDotsHorizontalRounded
                id="menuBtn"
                className={styles.menuIcon}
              />
              <Card className={styles.subMenu}>
                <span onClick={toggleShowEdit}>수정하기</span>
                <span onClick={toggleShowDelete}>삭제하기</span>
              </Card>
            </div>
          )}
        </div>

        <time
          className={styles.timeAgo}
          dateTime={new Date(parseInt(post.createAt))}>
          {post.createAt}
        </time>

        <p className={styles.content}>{post.content}</p>
        {post.imageUrl && post.imageUrl.length > 0 && (
          <a href={post.imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={post.imageUrl} alt="첨부" />
          </a>
        )}
      </Card>

      {showEdit && (
        <PostModal type={EDIT} toggleEdit={toggleShowEdit} post={post} />
      )}
      {showDelete && (
        <PostModal type={DELETE} toggleDelete={toggleShowDelete} post={post} />
      )}
    </>
  );
}
