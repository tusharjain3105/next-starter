import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { promiseHandler } from "../utils";
import axios from "../api";
import { AxiosError } from "axios";
import { PromiseResponse } from "../types";
import services from ".";

export interface User {
  id: string;
  name: string;
  email: string;
}

const AUTH_TOKEN_KEY = "auth-token";
const REFRESH_TOKEN_KEY = "refresh-token";

// TODO: Implement auth services
const authService = {
  async login(email: string, password: string): PromiseResponse<User> {
    const [error, response] = await promiseHandler(
      axios.post("/auth/login", { email, password }),
    );

    if (error) {
      return [error] as const;
    }

    const { accessToken, refreshToken, user } = response.data;
    setCookie(AUTH_TOKEN_KEY, accessToken);
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    return [, user] as const;
  },

  async logout() {
    sessionStorage.removeItem("user");
    deleteCookie(AUTH_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
  },

  async register(
    data: Omit<User, "id"> & { password: string },
  ): PromiseResponse<{ message: string }> {
    return promiseHandler(axios.post("/auth/register", data));
  },

  async verifyAccountWithOtp(
    email: string,
    otp: string,
  ): PromiseResponse<User> {
    const [error, response] = await promiseHandler(
      axios.post("/auth/verify-account", { email, otp }),
    );

    if (error) {
      return [error] as const;
    }

    const { accessToken, refreshToken, user } = response.data;
    setCookie(AUTH_TOKEN_KEY, accessToken);
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    return [, user] as const;
  },

  async verifyAccountWithToken(token: string): PromiseResponse<User> {
    const [error, response] = await promiseHandler(
      axios.post("/auth/verify-account", { token }),
    );

    if (error) {
      return [error] as const;
    }

    const { accessToken, refreshToken, user } = response.data;
    setCookie(AUTH_TOKEN_KEY, accessToken);
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    return [, user] as const;
  },

  async getCurrentUser(): Promise<User | null> {
    if (!getCookie(AUTH_TOKEN_KEY)) return null;

    // To prevent refetching
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user")!);
    }

    const [error, response] = await promiseHandler(axios.get("/auth/me"));

    if (error) return null;

    services.track.trackEvent("user_details_fetched", {
      userId: response.data.id,
    });

    sessionStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  async refreshToken() {
    const [error, response] = await promiseHandler(
      axios.post("/auth/refresh-token", {
        refreshToken: getCookie(REFRESH_TOKEN_KEY),
      }),
    );

    if (error) throw error;

    const { accessToken, refreshToken, user } = response.data;
    setCookie(AUTH_TOKEN_KEY, accessToken);
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem("user", JSON.stringify(user));
  },

  async resetPassword(email: string): PromiseResponse<User> {
    return promiseHandler(axios.post("/auth/reset-password", { email }));
  },

  async verifyResetPasswordWithOtp(
    email: string,
    otp: string,
    password: string,
  ): PromiseResponse<User> {
    return promiseHandler(
      axios.post("/auth/reset-password", { email, otp, password }),
    );
  },

  async verifyResetPasswordWithToken(
    token: string,
    password: string,
  ): PromiseResponse<User> {
    return promiseHandler(
      axios.post("/auth/verify-reset-password", { token, password }),
    );
  },

  async changePassword(oldPassword: string, newPassword: string) {
    return promiseHandler(
      axios.post("/auth/change-password", { oldPassword, newPassword }),
    );
  },

  async handleAuthError(error: AxiosError) {
    if (error.response?.status === 401) {
      const refreshToken = getCookie(REFRESH_TOKEN_KEY);
      await this.logout();
      if (refreshToken) {
        await this.refreshToken();
      }
    }
  },
};

export default authService;
