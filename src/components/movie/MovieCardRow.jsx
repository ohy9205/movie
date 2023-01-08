import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import styles from "./MovieCardRow.module.css";
import { changeDateFormat } from "../../utils/date";
import PickIcon from "../ui/PickIcon";

export default function MovieCardRow({ movie }) {
  const { poster, title, releaseDate, prodYear, genre } = movie;
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  return (
    <>
      <li className={styles.box}>
        <div className={styles.info} onClick={isShowToggle}>
          {poster ? (
            <img src={poster} alt={movie.title + " 포스터"} />
          ) : (
            <div className={styles.poster}>포스터 정보 없음</div>
          )}
          {/* <img src={poster} alt={movie.title + " 포스터"} /> */}
          <h2>{title}</h2>
          <p className={styles.genre}>{genre}</p>
          <p className={styles.date}>
            {changeDateFormat(releaseDate) || prodYear}
          </p>
        </div>
        <PickIcon className={styles.pickIconBox} movie={movie} />
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
