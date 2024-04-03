import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchAddAddress, selectAddresses } from "../../redux/slices/address";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Address.module.scss";

const cities = [
  "Астана",
  "Алматы",
  "Караганда",
  "Шымкент",
  "Актобе",
  "Актау",
  "Павлодар",
];

export const Address = () => {
  const [addAddress, setAddress] = React.useState(false);

  const isAuth = useSelector(selectIsAuth);
  const addresses = useSelector(selectAddresses);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setAddress(false);
    await dispatch(fetchAddAddress(values));
  };

  if (window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ paddingTop: "20px" }}>
      {addresses && addresses.length > 0 && (
        <>
          <div className={styles.addresses_list}>
            {addresses.map((address) => (
              <div key={address._id} className={styles.address_item}>
                <Typography variant="h6">{`г. ${address.city}, ${address.street}`}</Typography>
              </div>
            ))}
          </div>
          <Button
            sx={{
              backgroundColor: "rgb(43,46,131)",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            type="button"
            onClick={() => setAddress(true)}
            size="large"
            variant="contained"
            fullWidth
          >
            Добавить адрес
          </Button>
        </>
      )}

      {(addresses.length == 0 || addAddress) && (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Добавление адреса
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
              disablePortal
              options={cities}
              sx={{ width: 300, marginTop: "22px", marginBottom: "22px" }}
              onChange={(event, newValue) => {
                setValue("city", newValue, { shouldValidate: true });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Город"
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              )}
            />
            <TextField
              error={Boolean(errors.street?.message)}
              helperText={errors.street?.message}
              {...register("street", { required: "Укажите адрес" })}
              className={styles.field}
              label="Адрес"
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
              Добавить
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
};
