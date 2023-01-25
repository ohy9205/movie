import { child, get, onValue, ref, remove, set } from "firebase/database";
import Firebase from "./firebase";

export class MovieService extends Firebase {
  // db에서 데이터 들고오기
  get = async () => {
    const snapshot = await get(child(this._dbRef, "/movies"));
    if (snapshot.exists() && snapshot.val() !== null) {
      const values = Object.values(snapshot.val());
      return values;
    }
  };

  // db에서 데이터 찾기
  search = async ({ title, releaseDate, movieCode }) => {
    const snapshot = await get(child(this._dbRef, "/movies"));
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
        console.log(values);
        return values.filter((movie) => movie.title.includes(title));
      }
    } else {
      return null;
    }
  };

  // 데이터베이스에 영화 저장
  add = async (movie) => {
    try {
      await set(ref(this._dbService, `/movies/${movie.id}`), movie);
    } catch (error) {
      return;
    }
  };

  // 데이터베이스에 pick 저장
  addPick = (userId, movie) => {
    set(ref(this._dbService, `/picks/${userId}/${movie.id}`), movie);
  };

  // 데이터베이스에서pick 데이터 들고오기
  getPick = (userUid, callback) => {
    const pickRef = ref(this._dbService, `/picks/${userUid}`);
    onValue(pickRef, (snapshot) => {
      callback(snapshot.val());
    });
  };

  // pick 데이터 삭제
  removePick = (userUid, movieId) => {
    remove(ref(this._dbService, `/picks/${userUid}/${movieId}`));
  };
}
