import React, { useState } from "react";
import styles1 from "./Input.module.css";
import { FaUpload } from "react-icons/fa";

const FileInput = ({ accept, id, fileHandleFn, text }) => {
  const [fileName, setFileName] = useState("");
  function onChange(e) {
    console.log(e.target.files);
    setFileName(e.target.files[0].name);
    fileHandleFn(e.target.files[0]);
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={`${styles1["custom-input"]}`}
        style={{ cursor: "pointer" }}
      >
        {fileName ? (
          `${fileName}`
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {text} &nbsp; <FaUpload />
          </span>
        )}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
