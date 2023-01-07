import React from "react";
import ReactDOM from "react-dom";
import DeletePost from "./DeletePost";
import NewPost from "./NewPost";
import { DELETE, EDIT, MENU } from "./PostCard";

const Backdrop = ({ toggleMenu, toggleEdit, toggleDelete }) => {
  return (
    <div
      onClick={toggleMenu || toggleEdit || toggleDelete}
      style={{
        background: "gray",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        opacity: "0.5",
      }}
    />
  );
};

const ModalOverlay = ({
  position,
  toggleEdit,
  toggleDelete,
  // toggleMenu,
  post,
  type,
}) => {
  if (type === MENU) {
    return (
      <ul
        style={{
          background: "white",
          position: "absolute",
          top: position.y,
          left: position.x,
          zIndex: "99999",
        }}>
        <li onClick={toggleEdit}>수정하기</li>
        <li onClick={toggleDelete}>삭제하기</li>
      </ul>
    );
  } else if (type === EDIT) {
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
export default function PostModal({
  toggleMenu,
  toggleEdit,
  toggleDelete,
  position,
  post,
  type,
}) {
  console.log(post);

  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop toggleMenu={toggleMenu || toggleEdit || toggleDelete} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          position={position}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
          toggleMenu={toggleMenu}
          post={post}
          type={type}
        />,
        document.getElementById("modal-root")
      )}
    </div>
  );
}
