import React from "react";
import styles from "./Applications.module.scss";

export const Application = ({ id, dataMessage }) => {
  return (
    <div className={styles.Application}>
      <h3>{id}</h3>
      <ul>{dataMessage}</ul>
    </div>
  );
};
