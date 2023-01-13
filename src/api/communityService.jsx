import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import Firebase from "./firebase";

export class CommunityService extends Firebase {
  // 커뮤니티 게시글 저장
  add = (post) => {
    set(ref(this._dbService, `/community/posts/${post.id}`), post);
  };

  // 커뮤니티 게시글 들고오기
  get = async () => {
    const snapshot = await get(child(this._dbRef, "/community/posts"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  };

  // 게시글 수정
  update = async (post) => {
    update(ref(this._dbService, `/community/posts/${post.id}`), post);
  };

  // 게시글 삭제
  remove = async (postId) => {
    remove(ref(this._dbService, `/community/posts/${postId}`));
  };
}
