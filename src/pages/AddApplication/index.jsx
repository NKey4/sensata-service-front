import React, { useState } from "react";
import { selectIsAuth } from "../../redux/slices/auth";
import { selectAddresses } from "../../redux/slices/address";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Autocomplete, Paper, Button } from "@mui/material";

import "easymde/dist/easymde.min.css";
import styles from "./AddApplication.module.scss";
import {
  fetchAddApplication,
  selectOptions,
} from "../../redux/slices/application";

const reason = [
  "Отсутствие воды",
  "Отсутствие света",
  "Не работает видеонаблюдение",
  "Не работает домофон",
  "Грязно",
  "Неисправный лифт",
];

export const AddApplication = () => {
  const [selectedOptions, setOptions] = useState({
    location: null,
    address: null,
    reason: null,
    workType: null,
    description: null,
  });
  const isAuth = useSelector(selectIsAuth);
  const addresses = useSelector(selectAddresses);
  const options = useSelector(selectOptions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const fields = {
        addressId: selectedOptions.address._id,
        locationId: selectedOptions.location._id,
        workTypeId: selectedOptions.workType._id,
        reason: selectedOptions.reason,
        description: selectedOptions.description,
        dataMessage: `Заявка по адресу: г. ${selectedOptions.address.city}, ${selectedOptions.address.street} \n\t• местонахождение - ${selectedOptions.location.name}\n\t• тип работ - ${selectedOptions.workType.name}`,
      };
      await dispatch(fetchAddApplication(fields));
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
            setOptions((prev) => ({
              ...prev,
              address: newValue,
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Адрес" />}
        />
        <Autocomplete
          disablePortal
          options={options.locations}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setOptions((prev) => ({
              ...prev,
              location: newValue,
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Место" />}
        />
        <Autocomplete
          disablePortal
          options={options.categories}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setOptions((prev) => ({
              ...prev,
              workType: newValue,
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Тип работ" />}
        />
        <Autocomplete
          disablePortal
          options={reason}
          sx={{ width: 300, marginTop: "22px" }}
          onChange={(event, newValue) => {
            setOptions((prev) => ({
              ...prev,
              reason: newValue,
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Причина" />}
        />
        <TextField
          classes={{ root: styles.description }}
          variant="standard"
          placeholder="Описание"
          value={selectedOptions.description}
          sx={{ width: 500, marginTop: "30px" }}
          onChange={(e) =>
            setOptions((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
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
