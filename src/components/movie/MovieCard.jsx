import React, { useState } from "react";

import styles from "./MovieCard.module.css";
import MovieDetailModal from "./MovieDetailModal";
import PickIcon from "../ui/PickIcon";

export default function MovieCard({ movie, isPick }) {
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };
  return (
    <>
      <li className={styles.card}>
        <img
          src={
            movie.poster || `${process.env.PUBLIC_URL}/assets/poster_none.jpg`
          }
          style={{ display: "block", width: "100%" }}
          alt={movie.title + "포스터"}
          onClick={isShowToggle}
        />

        <div className={styles.pickBox}>
          <h1>{movie.title}</h1>
          <PickIcon className={styles.pickIcon} movie={movie} />
        </div>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
