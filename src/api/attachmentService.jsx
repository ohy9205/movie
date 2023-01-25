import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import Firebase from "./firebase";

export class AttachmentService extends Firebase {
  #storageService = getStorage();

  // 파일추가
  add = async (postId, file) => {
    const attachmentRef = ref(
      this.#storageService,
      `/images/${postId}/${file.id}`
    );
    await uploadString(attachmentRef, file.url, "data_url");
    return getDownloadURL(ref(this.#storageService, attachmentRef));
  };

  // 파일삭제
  remove = async (postId, imageUrl) => {
    const attachmentRef = ref(
      this.#storageService,
      `/images/${postId}/${imageUrl}`
    );
    deleteObject(attachmentRef);
  };
}
