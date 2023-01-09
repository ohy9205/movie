import React from "react";
import { useDispatch } from "react-redux";
import { removePostFetch } from "../../store/community/community-actions";
import Button from "../ui/Button";
import styles from "./DeletePost.module.css";

export default function DeletePost({ onClose, post }) {
  const dispatch = useDispatch();

  const onRemoveHandler = () => {
    dispatch(removePostFetch(post));
    onClose();
  };

  return (
    <div className={styles.deletePost}>
      <h1>정말 삭제하시겠습니까?</h1>
      <div className={styles.buttonBox}>
        <Button text="취소하기" onClick={() => onClose()} cancle />
        <Button text="삭제하기" onClick={onRemoveHandler} />
      </div>
    </div>
  );
}
