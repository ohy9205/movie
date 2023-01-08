import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../../store/auth/AuthContext";
import {
  addPickFetch,
  getPickFetch,
  removePickFetch,
} from "../../store/pick/pick-actions";
import MovieDetailModal from "./MovieDetailModal";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import styles from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
  const [isShow, setIsShow] = useState(false);
  const [isPick, setIsPick] = useState();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  const toggleIsPick = () => {
    setIsPick((isPick) => !isPick);
  };

  //내가 찜한 영화인지 확인
  useEffect(() => {
    // dispatch(getPickFetch())
  }, []);

  return (
    <>
      <li className={styles.box}>
        <img
          src={movie.poster}
          style={{ display: "block", width: "100%" }}
          alt={movie.title + "포스터"}
          onClick={isShowToggle}
        />

        <div className={styles.pickBox}>
          <h1>{movie.title}</h1>
          {user && !isPick ? (
            <BsSuitHeart
              className={`${styles.pick} ${styles.pickOn}`}
              onClick={() => dispatch(removePickFetch(user.uid, movie))}
            />
          ) : (
            <BsSuitHeartFill
              className={styles.pick}
              onClick={() => dispatch(addPickFetch(user.uid, movie))}
            />
          )}
        </div>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
