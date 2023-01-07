import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/movie/MovieCard";
import MovieCardRow from "../components/movie/MovieCardRow";
import Button from "../components/ui/Button";
import { getMovieFetch, searchMovieFetch } from "../store/movie/movie-actions";
import { getGenreVO } from "../utils/genre";

export default function Search() {
  const genreVO = getGenreVO();
  const dispatch = useDispatch();
  const searchMovieList = useSelector((state) => state.movies.search);
  const randomMovieList = useSelector((state) => state.movies.random);

  const [isSearch, setIsSearch] = useState(false);
  const [feadback, setFeadback] = useState();
  const [search, setSearch] = useState({});
  const [keywordText, setKeywordText] = useState();

  const onChangeHandler = (e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 검색
    setKeywordText(search.keyword);
    dispatch(searchMovieFetch({ title: search.keyword, genre: search.genre }));
    setIsSearch(true);
  };

  useEffect(() => {
    dispatch(getMovieFetch());
  }, [dispatch]);

  useEffect(() => {
    // 피드백처리
    if (searchMovieList.length === 0) {
      setFeadback("검색된 결과가 없습니다.");
    } else if (searchMovieList.length >= 30) {
      setFeadback("검색 결과가 너무 많아요! 더 구체적으로 검색해보세요.");
    } else {
      setFeadback(`총 ${searchMovieList.length}개의 결과가 조회되었습니다.`);
    }
  }, [searchMovieList]);

  const searchMovieSection = (
    <section>
      <h1>'{keywordText}' 검색결과</h1>
      {feadback && feadback}

      {searchMovieList.length > 0 &&
        searchMovieList.map((movie) => (
          <MovieCardRow key={movie.id} movie={movie} />
        ))}
    </section>
  );

  // 임의갯수의 영화 데이터
  const randomMovieListSection = (
    <section>
      <h1>이런 영화는 어떠세요?</h1>
      {randomMovieList && (
        <ul style={{ display: "flex" }}>
          {randomMovieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );

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
      {isSearch ? searchMovieSection : randomMovieListSection}
    </>
  );
}
