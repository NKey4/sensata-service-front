import React from "react";
import { useSelector } from "react-redux";
import { selectAppeals } from "../../redux/slices/appeal";
import styles from "./Appeals.module.scss";

export const Appeals = () => {
  const appeals = useSelector(selectAppeals);

  return (
    <div className={styles.appeals}>
      <h1>Обращения</h1>
      <div className={styles.appeals_list}>
        {!appeals.length && <h3>Ваш список обращений пуст :( </h3>}
        {appeals.length > 0 &&
          appeals.map((appeal, index) => (
            <div key={index} className={styles.appeal_item}>
              <h3>{appeal.question}</h3>
              <p>{appeal.answer}</p>
              <p className={styles.appeal_date}>
                Время обращения: {new Date(appeal.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
