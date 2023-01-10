import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/movie/MovieCard";
import styles from "./Pick.module.css";

export default function Pick() {
  const movies = useSelector((state) => state.pick.pick);
  return (
    <section className={styles.pick}>
      <h1 className={styles.pickTitle}>내가 'Pick'한 영화</h1>
      {movies.length > 0 && (
        <ul className={styles.box}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isPick />
          ))}
        </ul>
      )}
      {movies.length <= 0 && <h3>관심있는 영화를 Pick 해보세요</h3>}
    </section>
  );
}
