import React, { useState } from "react";
import { getGenreVO } from "../../utils/genre";
import { FiSearch } from "react-icons/fi";
import Button from "./Button";
import styles from "./SearchForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchMovieFetch } from "../../store/movie/movie-actions";

// export default function SearchForm({ onSubmit, onChange }) {
export default function SearchForm({ setKeyword }) {
  const dispatch = useDispatch();
  const genreVO = getGenreVO();
  const [search, setSearch] = useState({ keyword: "", genre: "" });

  const onChangeHandler = (e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 검색
    setKeyword(search.keyword);
    dispatch(searchMovieFetch({ title: search.keyword, genre: search.genre }));
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      <select name="genre" onChange={onChangeHandler} value={search.genre}>
        <option value="">전체</option>
        {genreVO &&
          genreVO.map((it) => (
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
        placeholder="영화명을 입력하세요"
      />
      <Button text={<FiSearch />} />
    </form>
  );
}
