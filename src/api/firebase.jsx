import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

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
export const logoutUser = () => {
  signOut(auth);
};

// 유저 관찰
export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// db데이터 들고오기

// db로부터 데이터 찾기
export const searchMovies = async ({ title, releaseDate, movieCode }) => {
  const snapshot = await get(child(dbRef, "/movies"));
  if (snapshot.exists() !== null) {
    const values = Object.values(snapshot.val());
    values.map((movie) => {
      if (movie.movieCode === movieCode) {
        return movie;
      } else if (movie.title === title && movie.releaseDate === releaseDate) {
        return movie;
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
};

// 데이터베이스에 저장
export const addMovie = async (movie) => {
  try {
    await set(ref(db, `/movies/${movie.id}`), movie);
  } catch (error) {
    console.log(error);
  }
};
