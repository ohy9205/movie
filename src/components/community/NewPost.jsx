import { uuidv4 } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../../store/auth/AuthContext";
import {
  addPostFetch,
  updatePostFetch,
} from "../../store/community/community-actions";
import Button from "../ui/Button";
import { TiDelete } from "react-icons/ti";
import { BsCardImage } from "react-icons/bs";
import styles from "./NewPost.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewPost() {
  const { user } = useAuthContext();
  const [newPost, setNewPost] = useState({});
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isImageDel, setIsImageDel] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isEdit = state && state.isEdit;
  const post = state && state.post;
  const navigate = useNavigate();

  const onClickDel = () => {
    if (isEdit) {
      setIsImageDel(true);
    } else {
      setFileDataUrl("");
    }
  };

  const onChangeHandler = (e) => {
    const { value, files, name } = e.target;

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

    setNewPost((post) => ({ ...post, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 수정창일경우
    if (isEdit) {
      const editPost = {
        ...post,
        title: newPost.title,
        content: newPost.content,
      };

      dispatch(updatePostFetch(editPost, isImageDel));
      navigate(`/community`, { replace: true });
      return;
    }

    const addPost = {
      id: uuidv4(),
      title: newPost.title,
      content: newPost.content,
      auth: user.email,
      commentCount: 0,
      createdAt: new Date().getTime(),
    };

    dispatch(addPostFetch(addPost, fileDataUrl));

    navigate(-1);
  };

  useEffect(() => {
    // 처음 수정 페이지에 들어왔을 때 파일 정보가 있으면 미리보기 보여주고 파일 데이터 유지
    if (isEdit) {
      setNewPost({ title: post.title, content: post.content });
      setImageUrl(post.imageUrl);
    }
  }, [isEdit, post]);

  return (
    <section className={styles.newPost}>
      <form className={styles.newPostForm} onSubmit={onSubmitHandler}>
        <input
          type="text"
          className={styles.title}
          value={newPost.title || ""}
          onChange={onChangeHandler}
          name="title"
          minLength="2"
          placeholder="제목을 입력하세요"
        />
        <h2 className={styles.user}>{user.email}</h2>
        <textarea
          type="text"
          className={styles.content}
          name="content"
          value={newPost.content || ""}
          onChange={onChangeHandler}
          placeholder="최대 1000자까지 입력 가능합니다."
          maxLength="1000"
          required
        />

        {!isImageDel && (fileDataUrl || imageUrl) && (
          <div className={`${styles.imgBox} ${isEdit && styles.isEdit}`}>
            <img
              src={imageUrl ? imageUrl : fileDataUrl && fileDataUrl}
              alt="첨부"
              accept="image/*"
            />
            <span onClick={onClickDel}>
              <TiDelete className={styles.delBtn} />
            </span>
          </div>
        )}

        {!isEdit && (
          <div className={styles.submitBox}>
            <label htmlFor="file">
              <BsCardImage />
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={onChangeHandler}
              hidden
            />
            <Button text="작성" />
          </div>
        )}

        {isEdit && (
          <div className={styles.submitBox}>
            <Button text="수정취소" onClick={() => navigate(-1)} cancle />
            <Button text="수정저장" />
          </div>
        )}
      </form>
    </section>
  );
}
