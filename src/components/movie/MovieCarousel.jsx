import React, { useRef, useState } from "react";
import styles from "./MovieCarousel.module.css";
import MovieCarouselCard from "./MovieCard";
import { GrNext, GrPrevious } from "react-icons/gr";
import Card from "../ui/Card";

// 배열을 나눔
const chunk = (data, size) => {
  const arr = [];
  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }
  return arr;
};

export default function MovieCarousel({ movies }) {
  const [current, setCurrent] = useState(1);
  const slideRef = useRef();
  let slide;
  let slideNum;
  let copiedSlide;

  // 카피 슬라이드
  const copySlide = (slide) => {
    const before = slide[slideNum - 1];
    const after = slide[0];
    return [before, ...slide, after];
  };

  if (movies.length > 0) {
    slide = chunk(movies, 5);
    slideNum = slide.length;
    copiedSlide = copySlide(slide);
    slideNum = copiedSlide.length;
  }

  const handleSlide = (direction) => {
    if (current === slideNum - 1) {
      setCurrent(1);

      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }

      setTimeout(() => {
        setCurrent(2);
      }, 0);
    } else if (current === 0) {
      setCurrent(slideNum - 2);

      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }
      setTimeout(() => {
        setCurrent(slideNum - 3);
      }, 0);
    } else {
      setCurrent((current) => current + direction);
    }

    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "all 500ms ease-in-out";
      }
    }, 0);
  };

  return (
    <div className={styles.box}>
      <GrPrevious className={styles.slideBtn} onClick={() => handleSlide(-1)} />

      <Card className={styles.carouselBox}>
        <ul
          ref={slideRef}
          className={styles.cardBox}
          style={{
            transform: `translateX(${-100 * current}%)`,
            transition: "all 500ms ease-in-out",
          }}>
          {copiedSlide &&
            copiedSlide.map((slides) => {
              return slides.map((movie) => (
                <MovieCarouselCard key={movie.id} movie={movie} />
              ));
            })}
        </ul>
      </Card>
      <GrNext className={styles.slideBtn} onClick={() => handleSlide(1)} />
    </div>
  );
}
