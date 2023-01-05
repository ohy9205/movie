import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: "gray",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        opacity: "0.5",
      }}
    />
  );
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
    <section
      style={{
        background: "white",
        width: "800px",
        height: "90vh",
        position: "absolute",
        top: "0",
      }}>
      <article style={{ display: "flex" }}>
        <img src={poster} alt={`${title} 포스터`} />
        <div>
          <h1>{title}</h1>
          <strong>{!titleOrg ? titleEng : `${titleOrg}, ${titleEng}`}</strong>
          <p>장르 : {genre}</p>
          <p>러닝타임 : {`${runtime}분`}</p>
          <p>개봉일 : {releaseDate || prodYear}</p>
          <p>국가 : {nation}</p>
          <p>등급 : {rating}</p>
          <p>감독 : {director}</p>
          <p>출연 : {actors}</p>
        </div>
      </article>
      <article>
        <p>{summary}</p>
      </article>
    </section>
  );
};

export default function MovieDetailModal({ onClick, movie }) {
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
