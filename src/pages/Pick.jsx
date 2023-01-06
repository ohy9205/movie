import React from "react";
import MovieCard from "../components/movie/MovieCard";

export default function Pick({ movies }) {
  return (
    <section>
      <h1>내가 '픽'한 영화</h1>
      {movies &&
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isPick />
        ))}
    </section>
  );
}
