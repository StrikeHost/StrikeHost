import axios from "axios";

export const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
  }

  return config;
});
