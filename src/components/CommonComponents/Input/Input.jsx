import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, state, setState, placeholder, required }) => {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={styles["custom-input"]}
    />
  );
};

export default Input;
