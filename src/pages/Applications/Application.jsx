import React from "react";
import styles from "./Applications.module.scss";

export const Application = ({ id, dataMessage, createdAt, status }) => {
  return (
    <div className={styles.Application}>
      <div className={styles.Head}>
        <h3 className={styles.ApplicationId}>{id}</h3>
        <li>{status}</li>
      </div>

      <p className={styles.ApplicationData}>{dataMessage}</p>
      <p className={styles.ApplicationCreatedAt}>
        Время обращения: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};
