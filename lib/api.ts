import nativeAxios, { AxiosError } from "axios";
import config from "./config";
import services from "./services";

const axios = nativeAxios.create({
  baseURL: config.serverUrl,
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const data = error.response?.data as { message: string };
    error.message = data?.message ?? error.message;

    await services.auth.handleAuthError(error);

    throw error;
  },
);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
