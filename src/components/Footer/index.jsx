import React from "react";
import styles from "./Footer.module.scss";
import { SocList } from "./SocList";

const socs = [
  {
    title: "facebook",
    href: "https://www.facebook.com/sensata.kz",
  },
  {
    title: "instagram",
    href: "https://www.instagram.com/sensata.kz/",
  },
  {
    title: "youtube",
    href: "https://www.youtube.com/channel/UCSoC9yOptHrz48cyH2N4SHg",
  },
  {
    title: "telegram",
    href: "https://t.me/sensatagroup",
  },
];

export const Footer = () => {
  return (
    <div className={styles.footer} style={{ display: "flex" }}>
      <img src="sensata.png" alt="" width={200} height={55} />
      <div className={styles.data}>
        <p>ТОО "Sensata Construction"</p>
        <p>БИН: 041040007551</p>
        <p>Sensata Group 2024 © Все права защищены</p>
      </div>
      <div className={styles.socList}>
        <ul>
          {socs.map((soc, value) => (
            <SocList key={value} title={soc.title} href={soc.href}></SocList>
          ))}
        </ul>
      </div>
    </div>
  );
};
