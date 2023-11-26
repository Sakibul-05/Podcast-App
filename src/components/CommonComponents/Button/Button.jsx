import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
