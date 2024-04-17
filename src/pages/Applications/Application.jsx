import React from "react";
import styles from "./Applications.module.scss";

const getStatusColor = (status) => {
  switch (status) {
    case "Новая":
      return "green";
    case "В работе":
      return "blue";
    case "Исполнена":
      return "grey";
    case "Закрыта":
      return "black";
    case "Отказана":
      return "red";
    case "Отменена":
      return "orange";
    default:
      return "black"; // Default color if the status is unrecognized
  }
};

export const Application = ({ id, dataMessage, createdAt, status }) => {
  return (
    <div className={styles.Application}>
      <div className={styles.Head}>
        <h3 className={styles.ApplicationId}>{id}</h3>
        <li style={{ color: getStatusColor(status) }}>{status}</li>
      </div>

      <p className={styles.ApplicationData}>{dataMessage}</p>
      <p className={styles.ApplicationCreatedAt}>
        Время обращения: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};
