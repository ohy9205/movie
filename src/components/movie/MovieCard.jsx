import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import styles from "./MovieCard.module.css";
import PickIcon from "../ui/PickIcon";

export default function MovieCard({ movie }) {
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

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
          <PickIcon movie={movie} />
        </div>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
