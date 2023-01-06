import { uuidv4 } from "@firebase/util";
import { getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { addPost, getPost } from "../api/firebase";
import { addFile } from "../api/upload";
import { useAuthContext } from "./AuthContext";
import { communityAction } from "./community-slice";

// dbd 게시글 저장
export const addPostFetch = (post, fileDataUrl) => {
  return async (dispatch) => {
    //파일저장
    let fileUploadUrl = "";
    if (fileDataUrl) {
      const file = { id: uuidv4(), url: fileDataUrl };
      // 파일 저장하고 url얻기
      fileUploadUrl = await addFile(post.id, file);
    }
    console.log(fileUploadUrl);

    const newPost = {
      ...post,
      imageUrl: fileUploadUrl,
    };
    // 리덕스에 업로드
    dispatch(communityAction.add(newPost));
    // db에 저장
    addPost(newPost);
  };
};

export const getPostListFetch = () => {
  return async (dispatch) => {
    const postList = await getPost();
    dispatch(communityAction.get(postList));
  };
};
