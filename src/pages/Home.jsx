import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  getBoxOfficeMoviesFetch,
  getMovieFetch,
  getRecentMoviesFetch,
} from "../store/movie/movie-actions";
import MovieCarousel from "../components/movie/MovieCarousel";
import styles from "./Home.module.css";
import MovieCard from "../components/movie/MovieCard";
import SearchForm from "../components/ui/SearchForm";

export default function Home() {
  const dispatch = useDispatch();
  const recentMovies = useSelector((state) => state.movies.recent);
  const boxOfficeMovies = useSelector((state) => state.movies.boxOffice);
  const randomMovieList = useSelector((state) => state.movies.random);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    dispatch(getRecentMoviesFetch());
    dispatch(getBoxOfficeMoviesFetch());
    dispatch(getMovieFetch());
  }, [dispatch]);

  useEffect(() => {
    if (
      recentMovies.length > 0 &&
      boxOfficeMovies.length > 0 &&
      randomMovieList.length > 0
    ) {
      setIsLoading(false);
    }
  }, [recentMovies, boxOfficeMovies, randomMovieList]);

  return (
    <section className={styles.home}>
      {isLoading && <h1>로딩중...</h1>}
      {!isLoading && (
        <>
          <header>
            <SearchForm search={{}} />
          </header>
          <article className={styles.article}>
            <h1 className={styles.homeTitle}>박스오피스</h1>
            {boxOfficeMovies.length > 0 && (
              <MovieCarousel movies={boxOfficeMovies} />
            )}
          </article>
          <article className={styles.article}>
            <h1 className={styles.homeTitle}>최신개봉</h1>
            {recentMovies.length > 0 && <MovieCarousel movies={recentMovies} />}
          </article>
          <article className={styles.random}>
            <h1 className={styles.secondTitle}>더 많은 영화를 확인해보세요</h1>
            {randomMovieList && (
              <ul>
                {randomMovieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </article>
        </>
      )}
    </section>
  );
}
