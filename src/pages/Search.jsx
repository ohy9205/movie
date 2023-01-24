import React, { useEffect, useState } from "react";
import MovieCardRow from "../components/movie/MovieCardRow";
import styles from "./Search.module.css";
import SearchForm from "../components/ui/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchMovieFetch } from "../store/movie/movie-actions";

export default function Search() {
  const searchMovieList = useSelector((state) => state.movies.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!keyword && !genre) {
      return;
    }
    dispatch(searchMovieFetch({ title: keyword, genre: genre }));
  }, [keyword, genre, dispatch]);

  useEffect(() => {
    // 피드백처리
    if (keyword || genre) {
      if (searchMovieList.length === 0) {
        setFeedback("검색 결과가 없습니다.");
      } else if (searchMovieList.length >= 30) {
        setFeedback("검색 결과가 너무 많아요! 더 구체적으로 검색해보세요.");
      } else {
        setFeedback(`총 ${searchMovieList.length}개의 결과가 조회되었습니다.`);
      }
    }
  }, [searchMovieList, keyword, genre]);

  return (
    <section>
      <div className={styles.search}>
        <SearchForm />
      </div>
      {feedback && (
        <div className={`${styles.result} `}>
          <h1>'{keyword}' 검색결과</h1>
          <p>{feedback && feedback}</p>

          {searchMovieList.length > 0 &&
            searchMovieList.map((movie) => (
              <MovieCardRow key={movie.id} movie={movie} />
            ))}
        </div>
      )}
      {!feedback && (
        <div className={styles.none}>
          <h1>궁금한 영화를 검색해 보세요!</h1>
        </div>
      )}
    </section>
  );
}
