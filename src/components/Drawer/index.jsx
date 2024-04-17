import React from "react";
import { logout } from "../../redux/slices/auth";
import styles from "./Drawer.module.scss";
import Button from "@mui/material/Button";

import "macro-css";
import { useDispatch } from "react-redux";

export const Drawer = ({ onClose, onExit, data }) => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");

      onExit(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Профиль{" "}
          <img
            className="cu-p"
            src="close.png"
            width={28}
            height={28}
            alt="Закрыть"
            onClick={() => onClose(false)}
          />
        </h2>

        <div className={styles.items}>
          <ul>
            <li>
              <h2>Полное имя: </h2>
              {data.fullName}
            </li>
            <li>
              <h2>Почта: </h2>
              {data.email}
            </li>
            <li>
              <h2>Номер телефона: </h2>
              {data.phoneNumber}
            </li>
            <li></li>
          </ul>
        </div>

        <div className={styles.cartTotalBlock}>
          <Button
            variant="contained"
            className={styles.drawerButton}
            sx={{
              backgroundColor: "rgb(48,49,131)",
            }}
            onClick={onClickLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};
