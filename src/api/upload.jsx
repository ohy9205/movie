import { initializeApp } from "@firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// 파일추가
export const addFile = async (postId, file) => {
  const attachmentRef = ref(storage, `/images/${postId}/${file.id}`);
  await uploadString(attachmentRef, file.url, "data_url");
  return getDownloadURL(ref(storage, attachmentRef));
};

// 파일삭제
export const removeFile = async (postId, imageUrl) => {
  const attachmentRef = ref(storage, `/images/${postId}/${imageUrl}`);
  deleteObject(attachmentRef);
};
