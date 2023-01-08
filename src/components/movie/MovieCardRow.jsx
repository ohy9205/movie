import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import styles from "./MovieCardRow.module.css";

export default function MovieCardRow({ movie }) {
  const { id, poster, title, releaseDate, prodYear, genre } = movie;
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  return (
    <>
      <li key={id} onClick={isShowToggle} style={{ display: "flex" }}>
        <img
          src={poster}
          style={{ display: "block", width: "100px" }}
          alt="X"
        />
        <div>
          <h2>{title}</h2>
          <p>{genre}</p>
        </div>
        <p>{releaseDate || prodYear}</p>
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
