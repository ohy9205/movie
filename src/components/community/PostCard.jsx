import React, { useState } from "react";
import { useAuthContext } from "../../store/auth/AuthContext";
import PostModal from "./PostModal";
import styles from "./PostCard.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { format } from "timeago.js";

export const MENU = "menu";
export const EDIT = "edit";
export const DELETE = "delete";

export default function PostCard({ post }) {
  const [positon, setPosition] = useState();
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const toggleShowEdit = () => {
    setShowMenu(false);
    setShowEdit((showEdit) => !showEdit);
  };

  const toggleShowDelete = () => {
    setShowMenu(false);
    setShowDelete((showDelete) => !showDelete);
  };

  const getPosition = (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const rect = e.target.getBoundingClientRect();
    setPosition({ y: rect.top, x: rect.left });
  };

  return (
    <article className={styles.postCard}>
      <div className={styles.headerBox}>
        <h1>{post.auth}</h1>
        <div className={styles.menu} onClick={getPosition}>
          {user.email === post.auth && (
            <BiDotsHorizontalRounded
              className={styles.menuIcon}
              onClick={toggleShowMenu}
            />
          )}
          {showMenu && (
            <PostModal
              type={MENU}
              toggleMenu={toggleShowMenu}
              toggleEdit={toggleShowEdit}
              toggleDelete={toggleShowDelete}
              position={positon}
            />
          )}
          {showEdit && (
            <PostModal type={EDIT} toggleEdit={toggleShowEdit} post={post} />
          )}
          {showDelete && (
            <PostModal
              type={DELETE}
              toggleDelete={toggleShowDelete}
              post={post}
            />
          )}
        </div>
      </div>

      <time
        className={styles.timeAgo}
        dateTime={new Date(parseInt(post.createAt))}>
        {format(post.createAt)}
      </time>

      <div className={styles.content}>
        <p>{post.content}</p>
        {post.imageUrl && post.imageUrl.length > 0 && (
          <img src={post.imageUrl} alt="첨부" />
        )}
      </div>
    </article>
  );
}
