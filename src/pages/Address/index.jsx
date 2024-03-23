import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddAddress, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Address.module.scss";

export const Address = () => {
  const [addAddress, setAddress] = React.useState("false");
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.auth.data?.address);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      address: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setAddress(false);
    await dispatch(fetchAddAddress(values));
  };

  return (
    <div>
      {addresses && addresses.length > 0 && (
        <>
          {addresses &&
            addresses.map((address) => {
              console.log(addresses);
              return <Typography variant="h5">{address}</Typography>;
            })}
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

      {!addresses ||
        (addAddress && (
          <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
              Добавление адреса
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={Boolean(errors.address?.message)}
                helperText={errors.address?.message}
                {...register("address", { required: "Укажите адрес" })}
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
        ))}
    </div>
  );
};
