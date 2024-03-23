import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

import styles from "./Applications.module.scss";
import { Application } from "./Application";
import { fetchApplications } from "../../redux/slices/application";

export const Applications = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchApplications());
  }, []);
  const items = useSelector((state) => state.application.items);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.Applications}>
      <h1
        style={{
          borderBottom: "2px solid grey",
          paddingTop: "20px",
        }}
      >
        Ваши заявки
      </h1>
      {items.map((item, index) => (
        <Application
          id={item.id}
          key={index}
          dataMessage={item.dataMessage}
          description={item.description}
        />
      ))}
    </div>
  );
};
