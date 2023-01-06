import { uuidv4 } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFile } from "../../api/upload";
import { useAuthContext } from "../../store/AuthContext";
import { addPostFetch } from "../../store/community-actions";
import Button from "../ui/Button";

export default function NewPost() {
  const { user } = useAuthContext();
  const [content, setContent] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { value, files } = e.target;

    // 파일 업로드에 필요한 url(reader.result) 얻기
    if (files) {
      // 파일 제거했을때 방어로직
      if (files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setFileDataUrl(reader.result);
        };
      }
      return;
    }

    // 글내용
    setContent(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const post = {
      id: uuidv4(),
      content,
      auth: user.email,
      commentCount: 0,
      createdAt: new Date().getTime(),
    };
    dispatch(addPostFetch(post, fileDataUrl));
  };

  return (
    <>
      {user && (
        <article>
          <h2>{user.email}</h2>
          <img
            src={fileDataUrl && fileDataUrl}
            style={{ width: "100px" }}
            alt=""
          />
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              value={content}
              onChange={onChangeHandler}
              placeholder="게시글을 입력하세요."
              required
            />
            <input type="file" accept="image/*" onChange={onChangeHandler} />
            <Button text="게시글 작성" />
          </form>
        </article>
      )}
    </>
  );
}
