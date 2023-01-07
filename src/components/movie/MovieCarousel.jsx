import React from "react";
import MovieCard from "../movie/MovieCard";

export default function MovieCarousel({ movies }) {
  return (
    <ul style={{ display: "flex" }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
