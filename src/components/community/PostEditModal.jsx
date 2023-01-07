import React from "react";
import ReactDOM from "react-dom";
import DeletePost from "./DeletePost";
import NewPost from "./NewPost";

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
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
const ModalOverlay = ({ isEdit, post, onClose }) => {
  return (
    <div
      style={{
        background: "white",
        width: "800px",
        height: "200px",
        position: "absolute",
        top: "0",
        zIndex: "99999",
      }}>
      {isEdit && <NewPost onClose={onClose} post={post} isEdit />}
      {!isEdit && <DeletePost onClose={onClose} post={post} />}
    </div>
  );
};

export default function PostEditModal({ onClose, isEdit, post }) {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay isEdit={isEdit} post={post} onClose={onClose} />,
        document.getElementById("modal-root")
      )}
    </div>
  );
}
