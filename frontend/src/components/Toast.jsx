import React from "react";
import styles from "./Toast.module.css";
import { FaCheckCircle } from "react-icons/fa";

const Toast = (props) => {
  return (
    <div
      className={styles.toast}
      style={{ backgroundColor: props.toast["bgColor"] }}
    >
      <div
        style={{ width: "100%", textAlign: "right" }}
        onClick={() => props.crossClose({ ...props.crossClose, status: false })}
      >
        &#10006;
      </div>
      <div style={{ fontSize: "20px", textAlign: "center" }}>
        <FaCheckCircle /> {props.message}
      </div>
      <div
        className={styles.progressToast}
        style={{ borderColor: props.toast["progbarColor"] }}
      ></div>
    </div>
  );
};

export default Toast;
