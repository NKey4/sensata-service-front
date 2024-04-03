import React from "react";
import { selectIsAuth } from "../../redux/slices/auth";
import { selectAddresses } from "../../redux/slices/address";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import axios from "../../axios";
import "easymde/dist/easymde.min.css";
import styles from "./AddApplication.module.scss";

const location = ["Квартира", "Подъезд", "Дом", "Двор", "Паркинг"];

const reason = [
  "Отсутствие воды",
  "Отсутствие света",
  "Не работает видеонаблюдение",
  "Не работает домофон",
  "Грязно",
  "Неисправный лифт",
];
const workType = [
  "Электричество",
  "Плотницкие работы",
  "Видеонаблюдение",
  "Домофон",
  "Клининг",
  "Лифт",
  "Другое",
];

export const AddApplication = () => {
  const [selectedLocation, setLocation] = React.useState(null);
  const [selectedAddress, setAddress] = React.useState(null);
  const [selectedReason, setReason] = React.useState(null);
  const [selectedWorkType, setWorkType] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const isAuth = useSelector(selectIsAuth);
  const addresses = useSelector(selectAddresses);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const fields = {
        address_id: selectedAddress,
        location: selectedLocation,
        workType: selectedWorkType,
        reason: selectedReason,
        description,
        dataMessage: `Заявка по адресу: ${selectedAddress} \n\t• местонахождение - ${selectedLocation}\n\t• тип работ - ${selectedWorkType}`,
      };
      await axios.post("/application", fields);
      navigate("/");
    } catch (error) {
      console.warn(error);
      console.warn("Ошибка при создании активности");
    }
  };

  if (window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.AddApplication}>
      <Paper style={{ padding: 30 }}>
        <h1>Создание заявки</h1>
        <Autocomplete
          disablePortal
          options={addresses}
          sx={{ width: 300, marginTop: "22px" }}
          getOptionLabel={(option) => "г." + option.city + ", " + option.street}
          onChange={(event, newValue) => {
            setAddress(newValue._id);
          }}
          renderInput={(params) => <TextField {...params} label="Адрес" />}
        />
        <Autocomplete
          disablePortal
          options={location}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setLocation(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Место" />}
        />
        <Autocomplete
          disablePortal
          options={workType}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setWorkType(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Тип работ" />}
        />
        <Autocomplete
          disablePortal
          options={reason}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setReason(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Причина" />}
        />
        <TextField
          classes={{ root: styles.description }}
          variant="standard"
          placeholder="Описание"
          value={description}
          sx={{ width: 500, marginTop: "30px" }}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            Опубликовать
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </Paper>
    </div>
  );
};
