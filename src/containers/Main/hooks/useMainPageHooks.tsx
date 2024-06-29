import { useEffect } from "react";
import { instance } from "../../../api/api";

export const useMainPageHooks = () => {
  const getNavigateInformation = async () => {
    try {
      const response = await instance.get("admin/menu/main");

      if (response) {
        console.log(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getNavigateInformation();
  }, []);

  return {
    test: "",
  };
};
