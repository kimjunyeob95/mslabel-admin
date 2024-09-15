import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { ADMIN_SUB_MENU } from "../../../utils/constants/apiKey";
import { SubMenuList } from "./types";

export interface SubMenuParams {
  page: number;
  page_size: number;
  group_ud: number;
  search_cls: string;
  keyword: string;
}

export const useSubMenuListHooks = () => {
  const [subMenuList, setSubMenuList] = useState<SubMenuList>();
  const [basicLabelSubMenuList, setBasicLabelSubMenuList] =
    useState<SubMenuList>();

  const [subMenuParams, setSubMenuParams] = useState<SubMenuParams>({
    page: 1,
    page_size: 10,
    group_ud: 0,
    search_cls: "",
    keyword: "",
  });

  const getSubMenuList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_SUB_MENU}?page=${subMenuParams.page}&page_size=${subMenuParams.page_size}`
      );

      if (response) {
        setSubMenuList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetSubmenuParams = (key: string, value: any) => {
    console.log(key, value);
    setSubMenuParams({ ...subMenuParams, [key]: value });
  };

  const getSubBasicLabelList = async (groupId: number) => {
    try {
      const response = await instance.get(
        `${ADMIN_SUB_MENU}?page=1&page_size=20&group_id=${groupId}`
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
  }, [subMenuParams.page]);

  return {
    subMenuList,
    basicLabelSubMenuList,
    getSubBasicLabelList,
    handleSetSubmenuParams,
  };
};
