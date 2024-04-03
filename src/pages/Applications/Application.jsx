import React from "react";
import styles from "./Applications.module.scss";

export const Application = ({ id, dataMessage }) => {
  return (
    <div className={styles.Application}>
      <h3 className={styles.ApplicationId}>{id}</h3>
      <p className={styles.ApplicationData}>{dataMessage}</p>
    </div>
  );
};
