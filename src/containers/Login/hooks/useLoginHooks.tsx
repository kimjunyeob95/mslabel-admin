import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../api/api";
import { LoginInformation } from "../types/types";

export const useLoginHooks = () => {
  const navigate = useNavigate();
  const [loginInformation, setLoginInformation] = useState<LoginInformation>({
    id: "",
    password: "",
  });

  const onChangeLoginInformation = (id: string, value: string) => {
    setLoginInformation({ ...loginInformation, [id]: value });
  };

  const onSubmitLogin = async () => {
    try {
      const response = await instance.post("api/v1/token/create", {
        user_id: loginInformation.id,
        password: loginInformation.password,
      });

      if (response) {
        localStorage.setItem("token", response.data.token);

        instance.interceptors.request.use(
          (config) => {
            // 로컬 스토리지 또는 다른 저장소에서 토큰 가져오기
            const token = localStorage.getItem("token");
            if (token) {
              config.headers["Authorization"] = `Bearer ${response.data.token}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        navigate("/main");
      }
    } catch (error) {
      console.log(error, "login error");
    }
  };

  return {
    loginInformation,
    onChangeLoginInformation,
    onSubmitLogin,
  };
};
