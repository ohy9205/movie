import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import DeletePost from "./DeletePost";
import NewPost from "./NewPost";
import { DELETE, EDIT } from "./PostDetail";
import styles from "./PostModal.module.css";

const Backdrop = ({ toggleMenu }) => {
  return <div className={styles.backdrop} onClick={toggleMenu} />;
};

const ModalOverlay = ({ toggleEdit, toggleDelete, post, type }) => {
  if (type === EDIT) {
    return (
      <div className={`${styles.overlay} ${styles.edit}`}>
        <NewPost onClose={toggleEdit} post={post} isEdit />
      </div>
    );
  } else if (type === DELETE) {
    return (
      <div className={`${styles.overlay} ${styles.delete}`}>
        <DeletePost onClose={toggleDelete} post={post} />
      </div>
    );
  }
};
export default function PostModal({ toggleEdit, toggleDelete, post, type }) {
  // 현재 위치에서 띄우기
  useEffect(() => {
    document.body.style.cssText = `
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleMenu={toggleEdit || toggleDelete} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
          post={post}
          type={type}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
