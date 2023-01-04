import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentMoviesFetch } from "../store/MoviesStore";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const recentMovies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getRecentMoviesFetch());
  }, []);

  return (
    <section>
      <article>
        <h1>최신순</h1>
        <ul style={{ display: "flex" }}>
          {recentMovies.map((movie) => (
            <li key={movie.id} tyle={{ width: "150px" }}>
              <img src={movie.poster} style={{ display: "block" }} alt="X" />
              {movie.title}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
