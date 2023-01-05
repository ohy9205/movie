import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCardRow from "../components/movie/MovieCardRow";
import Button from "../components/ui/Button";
import { searchMovieFetch } from "../store/movie-actions";
import { getGenreVO } from "../utils/genre";

export default function Search() {
  const genreVO = getGenreVO();
  const dispatch = useDispatch();
  const searchMovies = useSelector((state) => state.movies.search);

  const [search, setSearch] = useState({});

  const onChangeHandler = (e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 검색
    dispatch(searchMovieFetch({ title: search.keyword, genre: search.genre }));

    setSearch({});
  };

  return (
    <>
      <header>
        <form onSubmit={onSubmitHandler}>
          <select name="genre" onChange={onChangeHandler} value={search.genre}>
            <option value="">전체</option>
            {genreVO.map((it) => (
              <option key={it.key} value={it.value}>
                {it.value}
              </option>
            ))}
          </select>
          <input
            name="keyword"
            type="text"
            value={search.keyword || ""}
            onChange={onChangeHandler}
            autoComplete="off"
            minLength={2}
            required
          />
          <Button text="검색" />
        </form>
      </header>
      <section>
        <h1>검색결과</h1>
        {searchMovies.length <= 0 ? (
          <p>최대 30개 까지 결과가 조회됩니다.</p>
        ) : (
          <p>총 {searchMovies.length}개의 결과가 조회되었습니다.</p>
        )}
        {searchMovies.length >= 30 && (
          <p>검색 결과가 너무 많아요! 구체적인 검색어를 입력해주세요.</p>
        )}
        {searchMovies &&
          searchMovies.map((movie) => (
            <MovieCardRow key={movie.id} movie={movie} />
          ))}
      </section>
    </>
  );
}
