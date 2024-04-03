import React from "react";
import styles from "./Applications.module.scss";

export const Application = ({ id, dataMessage, createdAt }) => {
  return (
    <div className={styles.Application}>
      <h3 className={styles.ApplicationId}>{id}</h3>
      <p className={styles.ApplicationData}>{dataMessage}</p>
      <p className={styles.ApplicationCreatedAt}>
        Время обращения: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};
