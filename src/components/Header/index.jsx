import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

import Button from "@mui/material/Button";
import styles from "./Header.module.scss";

const pages = [
  { title: "Заявки", route: "/applications" },
  { title: "Мои адреса", route: "/address" },
  { title: "Яндекс Алиса", route: "/alice" },
  { title: "Мои обращения", route: "/appeals" },
];

export const Header = ({
  onClickProfile,
  onClickDrawer,
  drawerOpened,
  isMobile,
}) => {
  const isAuth = useSelector(selectIsAuth);
  const logoSrc = isMobile ? "sensata_mob.png" : "sensata.png";
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <ul className={styles.header_ul}>
          <Link to="/">
            <img
              src={logoSrc}
              alt="Sensata"
              width={"100%"}
              height={38}
              style={{ objectFit: "cover" }}
            ></img>
          </Link>

          {!isMobile &&
            pages.map((page) => (
              <Link key={page.page} to={page.route}>
                <li>{page.title}</li>
              </Link>
            ))}
        </ul>
      </div>
      {!isMobile ? (
        <div className={styles.headerRight}>
          {isAuth ? (
            <>
              <Link to="/add-application">
                <h3 className={styles.createApplication}>Новая заявка</h3>
              </Link>
              <img
                src="avatar.png"
                alt={"Вы"}
                width={59}
                height={50}
                onClick={isAuth ? onClickProfile(true) : onClickProfile(false)}
              ></img>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgb(43,46,131)",
                    color: "rgb(43,46,131)",
                  }}
                >
                  Создать аккаунт
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(43,46,131)" }}
                >
                  Войти
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <img
          src="menuIcon.png"
          alt={"Меню"}
          width={50}
          height={50}
          onClick={onClickDrawer(!drawerOpened)}
        ></img>
      )}
    </header>
  );
};
