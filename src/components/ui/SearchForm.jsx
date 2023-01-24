import React, { useState } from "react";
import { getGenreVO } from "../../utils/genre";
import { FiSearch } from "react-icons/fi";
import Button from "./Button";
import styles from "./SearchForm.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchForm({ setKeyword }) {
  const genreVO = getGenreVO();
  const [search, setSearch] = useState({ keyword: "", genre: "" });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (search.genre) {
      navigate(`/search?keyword=${search.keyword}&genre=${search.genre}`);
    } else {
      navigate(`/search?keyword=${search.keyword}`);
    }
  };

  return (
    <>
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

      <p className={styles.tipBox}>
        <span className={styles.tipBoxTitle}>검색 TIP {">"}</span>
        단어 단위로 입력하면 더 정확한 결과를 얻을 수 있습니다. [ex. 곤지(X) →
        곤지암(O)]
      </p>
    </>
  );
}
