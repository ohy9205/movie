import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import DeletePost from "./DeletePost";
import NewPost from "./NewPost";
import { DELETE, EDIT, MENU } from "./PostCard";
import styles from "./PostModal.module.css";

const Backdrop = ({ toggleMenu, toggleEdit, toggleDelete }) => {
  return (
    <div
      className={styles.backdrop}
      onClick={toggleMenu || toggleEdit || toggleDelete}
    />
  );
};

const ModalOverlay = ({ toggleEdit, toggleDelete, post, type }) => {
  if (type === EDIT) {
    return (
      <div
        style={{
          background: "white",
          width: "800px",
          position: "absolute",
          top: "0",
          zIndex: "99999",
        }}>
        <NewPost onClose={toggleEdit} post={post} isEdit />
      </div>
    );
  } else if (type === DELETE) {
    return (
      <div
        style={{
          background: "white",
          width: "800px",
          position: "absolute",
          top: "0",
          zIndex: "99999",
        }}>
        <DeletePost onClose={toggleDelete} post={post} />
      </div>
    );
  }
};
export default function PostModal({ toggleEdit, toggleDelete, post, type }) {
  // 현재 위치에서 띄우기
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
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
    <div>
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
    </div>
  );
}
