import { useState } from "react";
import { instance } from "../../../api/api";
import { ADMIN_SUB_MENU } from "../../../utils/constants/apiKey";

export enum BoardType {
  IMAGE = "image",
  PRODUCT = "product",
  BOARD = "board",
  EDITOR = "editor",
}

export interface RegistParams {
  group_id: number;
  title: string;
  type: BoardType;
}

export const useSubMenuRegistHooks = () => {
  const [registParams, setRegistParams] = useState<RegistParams>({
    group_id: 1,
    title: "",
    type: BoardType.IMAGE,
  });

  const handleSetRegistParams = (key: string, value: any) => {
    setRegistParams({ ...registParams, [key]: value });
  };

  const handleCreateSubMenu = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_SUB_MENU}/create`,
        registParams
      );

      if (response) {
        console.log(response);
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  return {
    registParams,
    handleSetRegistParams,
    handleCreateSubMenu,
  };
};
