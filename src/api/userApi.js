// src/api/userApi.js
import axios from "axios";

const API_URL = "http://localhost:3000/users";

// Register user baru
export const registerUser = async (userData) => {
  const res = await axios.post(API_URL, userData);
  return res.data;
};

// Login user
export const loginUser = async (username, password) => {
  const res = await axios.get(API_URL, {
    params: { username, password },
  });

  if (res.data.length > 0) {
    return res.data[0]; // user ditemukan
  } else {
    throw new Error("Username atau password salah");
  }
};
