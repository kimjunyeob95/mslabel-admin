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
      const response = await instance.post("token/create", {
        user_id: loginInformation.id,
        password: loginInformation.password,
      });

      if (response) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);

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
