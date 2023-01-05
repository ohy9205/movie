import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";

export default function MovieCard({ movie }) {
  const [isShow, setIsShow] = useState(false);

  const isShowToggle = () => {
    setIsShow((showDetail) => !showDetail);
  };

  return (
    <>
      <li key={movie.id} style={{ width: "150px" }} onClick={isShowToggle}>
        <img
          src={movie.poster}
          style={{ display: "block", width: "100%" }}
          alt="X"
        />
        {movie.title}
      </li>
      {isShow && <MovieDetailModal movie={movie} onClick={isShowToggle} />}
    </>
  );
}
