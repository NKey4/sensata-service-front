import React from "react";
import { Link } from "react-router-dom";
import styles from "./DrawerMob.module.scss";
const pages = [
  { title: "Заявки", route: "/applications" },
  { title: "Мои адреса", route: "/address" },
  { title: "Яндекс Алиса", route: "/alice" },
];
export const DrawerMob = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        {pages.map((page) => (
          <Link key={page.page} to={page.route}>
            <li>{page.title}</li>
          </Link>
        ))}
      </div>
    </div>
  );
};
