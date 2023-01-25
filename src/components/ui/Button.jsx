import React from "react";
import styles from "./Button.module.css";

export default function Button({ text, onClick, cancle }) {
  return (
    <button
      className={`${styles.button} ${cancle && styles.cancle}`}
      onClick={onClick}>
      {text}
    </button>
  );
}
