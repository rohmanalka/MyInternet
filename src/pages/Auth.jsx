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
  Box,
  Typography,
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
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          px: 3,
          py: 2,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600, mb: 1 }}>
        {tabValue === 0 ? "Buat Akun Baru" : "Masuk ke MyInternet"}
      </DialogTitle>

      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
            },
          }}
        >
          <Tab label="Daftar" />
          <Tab label="Masuk" />
        </Tabs>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            autoFocus
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              mt: 1,
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            {tabValue === 0
              ? "Dengan mendaftar, Anda dapat melakukan pembelian paket."
              : "Masuk untuk melanjutkan pembelian paket data."}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: 3,
            px: 3,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            borderRadius: 3,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 3px 6px rgba(25, 118, 210, 0.3)",
          }}
        >
          {tabValue === 0 ? "Daftar" : "Masuk"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Auth;
