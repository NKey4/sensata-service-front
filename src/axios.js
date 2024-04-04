import axios from "axios";

const instance = axios.create({
  baseURL: "https://sensata-back-b20cae4bd920.herokuapp.com", //http://localhost:3002
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
