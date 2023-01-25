import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

export default class Firebase {
  #firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  };

  _appService = initializeApp(this.#firebaseConfig);
  _dbService = getDatabase(this._appService);
  _dbRef = ref(this._dbService);
}
