import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/movie/MovieCard";
import { useAuthContext } from "../store/AuthContext";
import { getPickFetch } from "../store/pick-actions";

export default function Pick() {
  const dispathch = useDispatch();
  const { user } = useAuthContext();
  const pickMovies = useSelector((state) => state.pick.pick);
  useEffect(() => {
    user && dispathch(getPickFetch(user.uid));
  }, [user, dispathch]);
  return (
    <section>
      <h1>내가 '픽한 영화</h1>
      {pickMovies &&
        pickMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isPick />
        ))}
    </section>
  );
}
