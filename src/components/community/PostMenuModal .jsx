import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
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

const ModalOverlay = ({ position, onEdit, onDelete, onClose, post }) => {
  return (
    <ul
      style={{
        background: "white",
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: "99999",
      }}>
      <li onClick={onEdit}>수정하기</li>
      <li onClick={onDelete}>삭제하기</li>
    </ul>
  );
};

export default function PostMenuModal({
  onClose,
  onEdit,
  onDelete,
  position,
  post,
}) {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          position={position}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
          post={post}
        />,
        document.getElementById("modal-root")
      )}
    </div>
  );
}
