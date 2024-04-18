import React from "react";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddAppeal.module.scss";
import { fetchAddAppeal } from "../../redux/slices/appeal";

export const AddAppeal = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [appeal, setAppeal] = React.useState("");
  const [maxAppealLength, setMaxAppealLength] = React.useState(500);
  const [appealError, setAppealError] = React.useState("");
  const dispatch = useDispatch();

  const onChange = React.useCallback(
    (value) => {
      if (value.length <= maxAppealLength) {
        setAppeal(value);
        setAppealError("");
      } else {
        setAppealError(
          `Описание не может превышать ${maxAppealLength} символов.`
        );
      }
    },
    [maxAppealLength]
  );

  const onSubmit = async () => {
    try {
      navigate("/");
      await dispatch(fetchAddAppeal({ appeal }));
    } catch (error) {
      console.warn(error);
      console.warn("Ошибка при создании обращения");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "250px",
      autofocus: true,
      placeholder: "Введите описание...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <h1 style={{ marginBottom: "30px" }}>Создание обращения</h1>
      <SimpleMDE
        className={styles.editor}
        value={appeal}
        onChange={onChange}
        options={options}
      />
      <div style={{ marginTop: "5px" }}>
        {appeal.length}/{maxAppealLength} символов
      </div>
      {appealError && (
        <div style={{ color: "red", marginTop: "5px" }}>{appealError}</div>
      )}
      <div className={styles.buttons}>
        <Button
          onClick={onSubmit}
          size="large"
          variant="contained"
          sx={{ backgroundColor: "rgb(43,46,131)" }}
        >
          Отправить
        </Button>
        <a href="/">
          <Button sx={{ color: "rgb(43,46,131)" }} size="large">
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};
