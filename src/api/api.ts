import axios from "axios";
import { API_BASE_URL } from "../utils/constants/env";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: localStorage.getItem("token") },
});

instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지 또는 다른 저장소에서 토큰 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
