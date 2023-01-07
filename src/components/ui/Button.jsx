import React from "react";
import styles from "./Button.module.css";

export default function Button({ text, onClick, className, cancle }) {
  return (
    <button
      className={(className && className, styles.button)}
      onClick={onClick}>
      {text}
    </button>
  );
}
