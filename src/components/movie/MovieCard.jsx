import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [isPick, setIsPick] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const pickMovieList = useSelector((state) => state.pick.pick);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  const toggleIsPick = () => {
    setIsPick((isPick) => !isPick);
  };

  const addPickHandler = () => {
    dispatch(addPickFetch(user.uid, movie));
    toggleIsPick();
  };

  const removePickHandler = () => {
    dispatch(removePickFetch(user.uid, movie.id));
    toggleIsPick();
  };

  //내가 찜한 영화인지 확인
  useEffect(() => {
    console.log(pickMovieList);
    if (pickMovieList.length > 0) {
      for (const pick of pickMovieList) {
        pick.id === movie.id && setIsPick(true);
      }
    }
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
              onClick={addPickHandler}
            />
          ) : (
            <BsSuitHeartFill
              className={styles.pick}
              onClick={removePickHandler}
            />
          )}
        </div>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
