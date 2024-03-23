import React from "react";
import styles from "./Home.module.scss";

export const Info = ({ title, description }) => {
  return (
    <div className={styles.info}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
};
