import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuth,
  fetchSendCode,
  fetchCheckCode,
} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";

import InputMask from "react-input-mask";
import { Typography, TextField, Paper, Button, Alert } from "@mui/material";
import styles from "./Login.module.scss";

export const Login = () => {
  const [isClick, setIsClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {}, [timeLeft]);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      verificationCode: "",
    },
    mode: "onChange",
  });
  const verificationCode = useWatch({
    name: "verificationCode",
    control,
  });

  const handleSendCode = async (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
    };
    setIsClick(true);
    let timer = 120;
    const timerId = setInterval(() => {
      timer--;
      setTimeLeft(timer);
      if (timer === 0) {
        clearInterval(timerId);
        setIsClick(false);
      }
    }, 1000);

    await dispatch(fetchSendCode(values));
  };
  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(fetchCheckCode(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>

      <form onSubmit={isClick ? handleSubmit(onSubmit) : handleSendCode}>
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        {!isClick ? (
          <Button
            disabled={!isValid}
            variant="contained"
            sx={{ backgroundColor: "rgb(43, 46, 131)" }}
            classes={{ root: styles.button }}
            type="submit"
          >
            Отправить код подтверждения
          </Button>
        ) : (
          <div style={{ display: "block", textAlign: "center" }}>
            {timeLeft === 0 ? (
              <a
                style={{
                  color: "rgb(43, 46, 131)",
                  textAlign: "center",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleSendCode}
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
            <Controller
              name="verificationCode"
              control={control}
              rules={{ required: "Укажите код" }}
              render={({ field }) => (
                <InputMask mask="9999" maskChar=" " {...field}>
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      type="code"
                      sx={{ mt: "20px" }}
                      label="Код подтверждения"
                      fullWidth
                      error={Boolean(errors.verificationCode?.message)}
                      helperText={errors.verificationCode?.message}
                    />
                  )}
                </InputMask>
              )}
            />
            <Button
              disabled={
                !isValid || !(verificationCode && verificationCode.length === 4)
              }
              sx={{ backgroundColor: "rgb(43,46,131)", marginTop: "20px" }}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Авторизоваться
            </Button>
          </div>
        )}
      </form>
    </Paper>
  );
};
