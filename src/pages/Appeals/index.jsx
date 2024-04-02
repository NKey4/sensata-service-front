import React from "react";
import { useSelector } from "react-redux";
import { selectAppeals } from "../../redux/slices/appeal";
import styles from "./Appeals.module.scss";

export const Appeals = () => {
  const appeals = useSelector(selectAppeals);
  console.log(appeals);
  return (
    <div className={styles.appeals}>
      <h1>Обращения</h1>
      <div className={styles.appeals_list}>
        {!appeals.length && <h3>Ваш список обращений пуст :( </h3>}
        {appeals.length > 0 &&
          appeals.map((appeal, index) => (
            <div key={index} className={styles.appeal_item}>
              <h3>{appeal._id + ":" + appeal.question}</h3>
              <p>{appeal.answer}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
