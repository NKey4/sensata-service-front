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
];

export const Header = ({ onClickCart }) => {
  const isAuth = useSelector(selectIsAuth);
  const UserData = useSelector((state) => state.auth.data);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Определяем, какое изображение использовать в зависимости от ширины окна
  const logoSrc = windowWidth > 767 ? "sensata.png" : "sensata_mob.png";
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

          {pages.map((page) => (
            <Link key={page.page} to={page.route}>
              <li>{page.title}</li>
            </Link>
          ))}
        </ul>
      </div>
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
              onClick={isAuth ? onClickCart(true) : onClickCart(false)}
            ></img>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button
                variant="outlined"
                sx={{ borderColor: "rgb(43,46,131)", color: "rgb(43,46,131)" }}
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
    </header>
  );
};
