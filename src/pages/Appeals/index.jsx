import React from "react";
import { useSelector } from "react-redux";
import { selectAppeals } from "../../redux/slices/appeal";
import styles from "./Appeals.module.scss";

export const Appeals = () => {
  const appeals = useSelector(selectAppeals);
  return (
    <div className={style.appeals}>
      <h1>Обращения</h1>
      <div className={styles.appeals_list}>
        {appeals.map((appeal, index) => (
          <div key={index} className={style.appeal_item}>
            <h3>{appeal.question}</h3>
            <p>{appeal.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
