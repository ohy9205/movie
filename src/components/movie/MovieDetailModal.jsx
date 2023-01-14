import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { changeDateFormat } from "../../utils/date";
import styles from "./MovieDetailModal.module.css";

const Backdrop = ({ onClick }) => {
  return <div className={styles.backdrop} onClick={onClick} />;
};

const ModalOverlay = ({ movie }) => {
  const {
    title,
    titleOrg,
    titleEng,
    releaseDate,
    prodYear,
    summary,
    poster,
    genre,
    nation,
    runtime,
    rating,
    director,
    actors,
  } = movie;

  return (
    <section className={styles.detail}>
      <article className={styles.basicBox}>
        <img
          src={poster || `${process.env.PUBLIC_URL}/assets/poster_none.jpg`}
          alt={`${title} 포스터`}
        />
        <div className={styles.basic}>
          <h1>{title}</h1>
          <strong>{!titleOrg ? titleEng : `${titleOrg}, ${titleEng}`}</strong>
          <p>장르 : {genre}</p>
          <p>러닝타임 : {`${runtime}분`}</p>
          {releaseDate && <p>개봉일 : {changeDateFormat(releaseDate)}</p>}
          {!releaseDate && <p>제작연도 : {prodYear}</p>}
          <p>국가 : {nation}</p>
          <p>등급 : {rating}</p>
          <p>감독 : {director}</p>
          <p>출연 : {actors.join(", ")}</p>
        </div>
      </article>
      <article className={styles.summary}>{summary}</article>
    </section>
  );
};

export default function MovieDetailModal({ onClick, movie }) {
  // 현재 위치에서 띄우기
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay movie={movie} />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
