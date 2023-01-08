import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../../store/auth/AuthContext";
import { addPickFetch, removePickFetch } from "../../store/pick/pick-actions";
import MovieDetailModal from "./MovieDetailModal";
import styles from "./MovieCard.module.css";

export default function MovieCard({ movie, isPick }) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  // const moveSlide = (i) => {
  //   let nextIndex = current + i;

  //   if (nextIndex < 0) nextIndex = imgSize.current - 1;
  //   else if (nextIndex >= imgSize.current) nextIndex = 0;

  //   setCurrent(nextIndex);
  // };

  return (
    <li className={styles.box}>
      <div onClick={isShowToggle}>
        <img
          src={movie.poster}
          style={{ display: "block", width: "100%" }}
          alt="X"
        />
        {movie.title}
      </div>
      {user && !isPick && (
        <button onClick={() => dispatch(addPickFetch(user.uid, movie))}>
          추가
        </button>
      )}
      {user && isPick && (
        <button onClick={() => dispatch(removePickFetch(user.uid, movie.id))}>
          삭제
        </button>
      )}
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </li>
  );
}
