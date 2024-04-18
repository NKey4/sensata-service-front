import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3002",
  baseURL: "https://sensata-back-b20cae4bd920.herokuapp.com",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
