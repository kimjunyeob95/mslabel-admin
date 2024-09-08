import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { ADMIN_SUB_MENU } from "../../../utils/constants/apiKey";
import { SubMenuList } from "./types";

export const useSubMenuListHooks = () => {
  const [subMenuList, setSubMenuList] = useState<SubMenuList>();
  const [basicLabelSubMenuList, setBasicLabelSubMenuList] =
    useState<SubMenuList>();

  const getSubMenuList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_SUB_MENU}?page=1&page_size=50`
      );

      if (response) {
        setSubMenuList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubBasicLabelList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_SUB_MENU}?page=1&page_size=50&group_id=3`
      );

      if (response) {
        setBasicLabelSubMenuList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubMenuList();
  }, []);

  return { subMenuList, basicLabelSubMenuList, getSubBasicLabelList };
};
