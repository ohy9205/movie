import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../store/auth/AuthContext";
import { addPickFetch, removePickFetch } from "../../store/pick/pick-actions";
import styles from "./PickIcon.module.css";

export default function PickIcon({ movie, className }) {
  const [isPick, setIsPick] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const pickMovieList = useSelector((state) => state.pick.pick);

  const toggleIsPick = () => {
    setIsPick((isPick) => !isPick);
  };

  const addPickHandler = () => {
    dispatch(addPickFetch(user.uid, movie));
    toggleIsPick();
  };

  const removePickHandler = () => {
    dispatch(removePickFetch(user.uid, movie.id));
    toggleIsPick();
  };

  //내가 찜한 영화인지 확인
  useEffect(() => {
    if (pickMovieList.length > 0) {
      for (const pick of pickMovieList) {
        pick.id === movie.id && setIsPick(true);
      }
    }
  }, []);

  return (
    <div className={className}>
      {user && !isPick ? (
        <BsSuitHeart className={styles.pick} onClick={addPickHandler} />
      ) : (
        <BsSuitHeartFill
          className={`${styles.pick}`}
          onClick={removePickHandler}
        />
      )}
    </div>
  );
}
