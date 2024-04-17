import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export const CustomDrawer = ({ onClose, onExit, data }) => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      onExit(false);
    }
  };

  return (
    <Drawer anchor="right" open={true} onClose={() => onClose(false)}>
      <div style={{ width: 420, padding: 30 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <Typography variant="h6">Профиль</Typography>
          <IconButton onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <List>
          <ListItem>
            <ListItemText primary="Полное имя:" secondary={data.fullName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Почта:" secondary={data.email} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Номер телефона:"
              secondary={data.phoneNumber}
            />
          </ListItem>
        </List>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(48,49,131)" }}
            onClick={onClickLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
