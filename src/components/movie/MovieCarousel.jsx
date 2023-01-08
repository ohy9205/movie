import React, { useRef, useState } from "react";
import MovieCard from "../movie/MovieCard";
import styles from "./MovieCarousel.module.css";
import Button from "../ui/Button";

export default function MovieCarousel({ movies }) {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef();

  const onNextSlider = () => {
    setCurrent((current) => current + 1);
  };

  const onPrevSlider = () => {
    setCurrent((current) => current - 1);
  };

  return (
    <div className={styles.box}>
      <Button text={"<"} onClick={onPrevSlider} />
      <div className={styles.carouselBox}>
        <ul ref={slideRef} class={styles.boxInner}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
      <Button text={">"} onClick={onNextSlider} />
    </div>
  );
}
