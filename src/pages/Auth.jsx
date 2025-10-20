import React, { useState } from "react";
import { useNotify } from "/src/hooks/useNotify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import { loginUser, registerUser } from "../api/userApi";

const Auth = ({ open, handleClose, defaultTab = 0, onLoginSuccess }) => {
  const [tabValue, setTabValue] = useState(defaultTab);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const {notifySuccess, notifyError, notifyInfo} = useNotify();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (tabValue === 0) {
        await registerUser(formData);
        notifySuccess("Registrasi berhasil! Silakan login.");
        setTabValue(1);
        setFormData({ username: "", password: "" });
      } else {
        const user = await loginUser(formData.username, formData.password);
        notifyInfo(`Selamat datang, ${user.username}!`);
        onLoginSuccess(user);
        handleClose();
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{tabValue === 0 ? "Daftar Akun" : "Masuk"}</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
        >
          <Tab label="Daftar" />
          <Tab label="Masuk" />
        </Tabs>

        <TextField
          autoFocus
          margin="dense"
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          name="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {tabValue === 0 ? "Daftar" : "Masuk"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Auth;
