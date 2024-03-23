import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuth,
  fetchSendCode,
  fetchCheckCode,
} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import InputMask from "react-input-mask";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

export const Login = () => {
  const [isAccept, setIsAccept] = React.useState(false);

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: {
      email: "kaznurbek1@yandex.ru",
      verificationCode: "",
    },
    mode: "onChange",
  });

  const handleSendCode = async (values) => {
    await dispatch(fetchSendCode(values));
    setIsAccept(true);
  };

  const onSubmit = async (values) => {
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

      <form onSubmit={handleSubmit(handleSendCode)}>
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />

        <Button
          disabled={!isValid}
          sx={{
            backgroundColor: "rgb(43,46,131)",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Отправить код на почту
        </Button>
      </form>

      {isAccept && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={!isValid}
            sx={{ backgroundColor: "rgb(43,46,131)", marginTop: "20px" }}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Авторизоваться
          </Button>
        </form>
      )}
    </Paper>
  );
};
