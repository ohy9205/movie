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
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
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

// db에서 데이터 들고오기
export const getMovie = async () => {
  const snapshot = await get(child(dbRef, "/movies"));
  if (snapshot.exists() && snapshot.val() !== null) {
    const values = Object.values(snapshot.val());
    return values;
  }
};

// db에서 데이터 찾기
export const searchMovie = async ({ title, releaseDate, movieCode }) => {
  const snapshot = await get(child(dbRef, "/movies"));
  if (snapshot.exists() && snapshot.val() !== null) {
    const values = Object.values(snapshot.val());

    if (releaseDate || movieCode) {
      return values.find((movie) => {
        if (movie.title === title && movie.releaseDate === releaseDate) {
          return movie;
        } else if (movie.title === title && movie.movieCode === movieCode) {
          return movie;
        } else {
          return null;
        }
      });
    } else {
      return values.filter((movie) => movie.title.includes(title));
    }
  } else {
    return null;
  }
};

// 데이터베이스에 영화 저장
export const addMovie = async (movie) => {
  try {
    await set(ref(db, `/movies/${movie.id}`), movie);
  } catch (error) {
    return;
  }
};

// 데이터베이스에 pick 저장
export const addPick = (userId, movie) => {
  set(ref(db, `/picks/${userId}/${movie.id}`), movie);
};

// 데이터베이스에서pick 데이터 들고오기
export const getPick = (userUid, callback) => {
  const pickRef = ref(db, `/picks/${userUid}`);
  onValue(pickRef, (snapshot) => {
    callback(snapshot.val());
  });
};

// pick 데이터 삭제
export const removePick = (userUid, movieId) => {
  remove(ref(db, `/picks/${userUid}/${movieId}`));
};

// 커뮤니티 게시글 저장
export const addPost = (post) => {
  set(ref(db, `/community/posts/${post.id}`), post);
};

// 커뮤니티 게시글 들고오기
export const getPost = async () => {
  const snapshot = await get(child(dbRef, "/community/posts"));
  if (snapshot.exists()) {
    console.log(snapshot.val());
    console.log(Object.values(snapshot.val()));
    return Object.values(snapshot.val());
  }
};
