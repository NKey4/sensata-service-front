import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAliceCode, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { Paper, Button, Typography } from "@mui/material";
import styles from "./Alice.module.scss";

export const Alice = () => {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {}, [timeLeft]);
  const aliceCode = useSelector((state) => state.auth.data?.aliceCode);
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  const handleClick = async () => {
    setIsClick(true);
    let timer = 120;
    const timerId = setInterval(() => {
      timer--;
      setTimeLeft(timer);
      if (timer === 0) {
        clearInterval(timerId);
      }
    }, 1000);

    await dispatch(fetchAliceCode());
  };
  return (
    <div>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h3">
          Яндекс Алиса
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Бот Sensata Service - подача заявки с помощью Яндекс.Алисы
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {!isClick ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(43, 46, 131)" }}
              onClick={handleClick}
              classes={{ root: styles.button }}
            >
              Показать код
            </Button>
          ) : (
            <div style={{ display: "block", textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "rgb(43, 46, 131)" }}
              >
                {aliceCode}
              </Typography>
              {timeLeft === 0 ? (
                <a
                  style={{
                    color: "rgb(43, 46, 131)",
                    textAlign: "center",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  Отправить повторно
                </a>
              ) : (
                <Typography
                  variant="h8"
                  sx={{
                    color: "rgb(43, 46, 131)",
                    textAlign: "center",
                  }}
                >
                  Отправить повторно через {Math.floor(timeLeft / 60)}:
                  {timeLeft % 60 < 10 ? "0" : ""}
                  {timeLeft % 60}
                </Typography>
              )}
            </div>
          )}
        </div>

        <Typography sx={{ marginTop: "20px" }}>
          Для подключения скажите Алисе "вызвать навык Сенсата Сервис" Затем
          продиктуйте номер телефона и сгенерите в приложении код и озвучте
          Алисе Для отправки заявки Алисе скажите "Алиса, у меня нет воды"
        </Typography>
      </Paper>
    </div>
  );
};
