import React from "react";
import { useDispatch } from "react-redux";
import { removePostFetch } from "../../store/community-actions";
import Button from "../ui/Button";

export default function DeletePost({ onClose, post }) {
  const dispatch = useDispatch();

  const onRemoveHandler = () => {
    dispatch(removePostFetch(post));
    onClose();
  };

  return (
    <div>
      <h1>삭제하시겠습니까?</h1>
      <Button text="삭제하기" onClick={onRemoveHandler} />
      <Button text="취소하기" onClick={() => onClose()} />
    </div>
  );
}
