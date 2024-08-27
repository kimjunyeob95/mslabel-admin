import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { ADMIN_MAIN_MENU } from "../../../utils/constants/apiKey";
import { MainMenuList } from "./types";

export const useMainMenuListHooks = () => {
  const [mainMenuList, setMainMenuList] = useState<MainMenuList[]>();

  const getMainMenuList = async () => {
    try {
      const response = await instance.get(ADMIN_MAIN_MENU);

      if (response) {
        setMainMenuList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainMenuList();
  }, []);

  return {
    mainMenuList,
  };
};
