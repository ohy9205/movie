import { uuidv4 } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFile } from "../../api/upload";
import { useAuthContext } from "../../store/AuthContext";
import { addPostFetch, updatePostFetch } from "../../store/community-actions";
import Button from "../ui/Button";

export default function NewPost({ onClose, isEdit, post }) {
  const { user } = useAuthContext();
  const [content, setContent] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isImageDel, setIsImageDel] = useState(false);
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

    // 수정창일경우
    if (isEdit) {
      const newPost = {
        ...post,
        content,
      };

      dispatch(updatePostFetch(newPost, isImageDel));
      onClose();
      return;
    }

    const newPost = {
      id: uuidv4(),
      content,
      auth: user.email,
      commentCount: 0,
      createdAt: new Date().getTime(),
    };

    dispatch(addPostFetch(newPost, fileDataUrl));

    setContent("");
    setFileDataUrl("");
  };

  useEffect(() => {
    // 처음 수정 페이지에 들어왔을 때 파일 정보가 있으면 미리보기 보여주고 파일 데이터 유지
    if (isEdit) {
      setContent(post.content);
      setImageUrl(post.imageUrl);
    }
  }, []);

  return (
    <>
      {user && (
        <article>
          <h2>{user.email}</h2>
          {!isImageDel && (
            <div>
              <img
                src={imageUrl ? imageUrl : fileDataUrl && fileDataUrl}
                style={{ width: "100px" }}
                alt=""
              />
              <span onClick={() => setIsImageDel(true)}>X</span>
            </div>
          )}
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              value={content}
              onChange={onChangeHandler}
              placeholder="게시글을 입력하세요."
              required
            />
            {!isEdit && (
              <>
                <label htmlFor="file">사진추가</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={onChangeHandler}
                  hidden
                />
              </>
            )}

            <Button text={isEdit ? "수정" : "작성"} />
          </form>
        </article>
      )}
    </>
  );
}
