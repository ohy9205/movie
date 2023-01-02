import firebase, { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 회원가입
export const createUser = async ({ email, password }, callback) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      alert("가입완료");
      return res;
    })
    .catch((error) => callback(`가입에 실패했습니다. ${error.code}`));
};

// 로그인
export const loginUser = async ({ email, password }, callback) => {
  await setPersistence(auth, browserSessionPersistence);

  return await signInWithEmailAndPassword(auth, email, password)
    .then((res) => res)
    .catch((error) => callback(`로그인에 실패했습니다. ${error.code}`));
};

// 로그아웃
export const logoutUser = async () => {
  console.log(auth);
  signOut(auth).catch((error) => {
    // An error happened.
    console.log(error);
  });
};

// 유저 관찰
export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  // onAuthStateChanged(auth, (user) => {
  //   callback(user);
  // });
};
