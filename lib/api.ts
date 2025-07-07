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

// Mock responses
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const pathname = error.config?.url;

    switch (pathname) {
      case "/auth/login":
        return Promise.resolve({
          data: {
            user: MOCK_USER,
            accessToken: JSON.stringify(MOCK_USER),
            refreshToken: JSON.stringify(MOCK_USER),
          },
        });
    }

    throw error;
  },
);

export default axios;

const MOCK_USER = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
};
