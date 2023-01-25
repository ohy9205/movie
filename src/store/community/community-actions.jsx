import { uuidv4 } from "@firebase/util";
import { AttachmentService } from "../../api/attachmentService";
import { CommunityService } from "../../api/communityService";
import { communityAction } from "./community-slice";

const community = new CommunityService();
const attachment = new AttachmentService();

// db에 게시글 저장
export const addPostFetch = (post, fileDataUrl) => {
  return async (dispatch) => {
    //파일저장
    let fileUploadUrl = "";
    let file = {};
    if (fileDataUrl) {
      file = { id: uuidv4(), url: fileDataUrl };
      // 파일 저장하고 url얻기
      fileUploadUrl = await attachment.add(post.id, file);
    }

    const newPost = {
      ...post,
      imageUrl: fileUploadUrl,
      image: file.id || "",
    };
    // 리덕스에 업로드
    dispatch(communityAction.add(newPost));
    // db에 저장
    community.add(newPost);
  };
};

// 게시글 가져오기
export const getPostListFetch = () => {
  return async (dispatch) => {
    const postList = await community.get();
    dispatch(communityAction.get(postList));
  };
};

// 게시글 업데이트
export const updatePostFetch = (post, isImageDel) => {
  return async (dispatch) => {
    // 이미지 삭제 여부를 판단하는 조건필요
    if (isImageDel) {
      // firestore에서 이미지 삭제
      attachment.remove(post.id, post.image);

      // 글정보에서 imageUrl, image 제거
      post.imageUrl = "";
      post.image = "";
    }

    // 리덕스 업데이트
    dispatch(communityAction.update(post));
    // db도 업데이트
    community.update(post);
  };
};

// 게시글 삭제
export const removePostFetch = (post) => {
  return async (dispatch) => {
    // 만약 사진 정보가 있으면 사진부터 삭제
    if (post.image.length > 0) {
      attachment.remove(post.id, post.image);
    }

    dispatch(communityAction.remove(post.id));
    community.remove(post.id);
  };
};
