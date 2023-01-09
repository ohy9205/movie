import React, { useEffect, useState } from "react";
import MovieCardRow from "../components/movie/MovieCardRow";
import styles from "./Search.module.css";
import SearchForm from "../components/ui/SearchForm";
import { useSelector } from "react-redux";

export default function Search() {
  const searchMovieList = useSelector((state) => state.movies.search);

  const [feedback, setFeedback] = useState("");
  const [keywordText, setKeywordText] = useState();

  useEffect(() => {
    // 피드백처리
    if (searchMovieList.length === 0) {
      setFeedback("검색 결과가 없습니다.");
    } else if (searchMovieList.length >= 30) {
      setFeedback("검색 결과가 너무 많아요! 더 구체적으로 검색해보세요.");
    } else {
      setFeedback(`총 ${searchMovieList.length}개의 결과가 조회되었습니다.`);
    }
  }, [searchMovieList]);
  console.log(feedback);

  return (
    <section>
      <div className={styles.search}>
        <SearchForm setKeyword={setKeywordText} />
        <div className={styles.tipBox}>
          <h2>검색 TIP {">"} </h2>
          <p>
            단어 단위로 입력하면 더 정확한 결과를 얻을 수 있습니다. [ex. 곤지(X)
            → 곤지암(O)]
          </p>
        </div>
      </div>
      {searchMovieList.length > 0 && (
        <div className={`${styles.result} `}>
          <h1>'{keywordText}' 검색결과</h1>
          <p>{feedback && feedback}</p>

          {searchMovieList.length > 0 &&
            searchMovieList.map((movie) => (
              <MovieCardRow key={movie.id} movie={movie} />
            ))}
        </div>
      )}
      {searchMovieList.length <= 0 && feedback && (
        <div>
          <p>{feedback}</p>
        </div>
      )}
    </section>
  );
}
