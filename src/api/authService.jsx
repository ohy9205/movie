import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Firebase from "./firebase";

class AuthService extends Firebase {
  authService = getAuth(this._appService);
  providerService = new GoogleAuthProvider();
  // 회원가입
  createUser = async ({ email, password }, callback) => {
    return createUserWithEmailAndPassword(this.authService, email, password)
      .then((res) => {
        alert("가입완료");
        return res;
      })
      .catch((error) => callback(`가입에 실패했습니다. ${error.code}`));
  };

  // 로그인
  loginUser = async ({ email, password }, callback) => {
    await setPersistence(this.authService, browserSessionPersistence);
    return signInWithEmailAndPassword(this.authService, email, password)
      .then((res) => res)
      .catch((error) => callback(`로그인에 실패했습니다. ${error.code}`));
  };

  // 구글로그인
  loginGoggle = async () => {
    await setPersistence(this.authService, browserSessionPersistence);
    signInWithPopup(this.authService, this.providerService);
  };

  // 로그아웃
  logoutUser = () => {
    signOut(this.authService);
  };

  // 유저 관찰
  onUserStateChange = (callback) => {
    onAuthStateChanged(this.authService, (user) => {
      callback(user);
    });
  };
}

export function useAuth() {
  const auth = new AuthService();
  return {
    signUp: auth.createUser,
    signIn: auth.loginUser,
    signInWithGoogle: auth.loginGoggle,
    logout: auth.logoutUser,
    authStateChanged: auth.onUserStateChange,
  };
}
