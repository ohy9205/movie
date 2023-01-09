import React from "react";
import MovieCard from "../components/movie/MovieCard";
import styles from "./Pick.module.css";

export default function Pick({ movies }) {
  return (
    <section className={styles.pick}>
      <h1 className={styles.pickTitle}>내가 'Pick'한 영화</h1>
      {movies && (
        <ul className={styles.box}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isPick />
          ))}
        </ul>
      )}
    </section>
  );
}
