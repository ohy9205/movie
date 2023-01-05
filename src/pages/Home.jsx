import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import MovieCard from "../components/movie/MovieCard";
import {
  getBoxOfficeMoviesFetch,
  getRecentMoviesFetch,
} from "../store/movie-actions";

export default function Home() {
  const dispatch = useDispatch();
  const recentMovies = useSelector((state) => state.movies.recent);
  const boxOfficeMovies = useSelector((state) => state.movies.boxOffice);

  useEffect(() => {
    dispatch(getRecentMoviesFetch());
    dispatch(getBoxOfficeMoviesFetch());
  }, [dispatch]);

  return (
    <section>
      <article>
        <h1>박스오피스</h1>
        <ul style={{ display: "flex" }}>
          {boxOfficeMovies &&
            boxOfficeMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      </article>
      <article>
        <h1>최신순</h1>
        <ul style={{ display: "flex" }}>
          {recentMovies &&
            recentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      </article>
    </section>
  );
}
