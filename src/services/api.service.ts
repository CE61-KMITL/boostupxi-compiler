import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});
