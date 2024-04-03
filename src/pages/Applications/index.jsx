import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { selectApplications } from "../../redux/slices/application";
import { Navigate } from "react-router-dom";
import { Application } from "./Application";

import styles from "./Applications.module.scss";

export const Applications = () => {
  const isAuth = useSelector(selectIsAuth);
  const applications = useSelector(selectApplications);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.Applications}>
      <h1 className={styles.Title}>Ваши заявки</h1>
      <div className={styles.ApplicationList}>
        {applications.map((item, index) => (
          <Application
            key={index}
            id={item.id}
            dataMessage={item.dataMessage}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
