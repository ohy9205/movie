import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import styles from "./MovieCardRow.module.css";
import { changeDateFormat } from "../../utils/date";
import PickIcon from "../ui/PickIcon";
import Card from "../ui/Card";

export default function MovieCardRow({ movie }) {
  const { poster, title, releaseDate, prodYear, genre } = movie;
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  return (
    <>
      {/* <li className={styles.box}> */}
      <li>
        <Card className={styles.box}>
          <div className={styles.info} onClick={isShowToggle}>
            <img
              src={poster || `${process.env.PUBLIC_URL}/assets/poster_none.jpg`}
              alt={movie.title + " 포스터"}
            />
            <h2>{title}</h2>
            <p className={styles.genre}>{genre}</p>
            <p className={styles.date}>
              {changeDateFormat(releaseDate) || prodYear}
            </p>
          </div>
          <PickIcon className={styles.pickIconBox} movie={movie} />
        </Card>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
