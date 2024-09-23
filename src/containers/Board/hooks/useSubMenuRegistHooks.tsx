import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        navigate("/board/subMenu?content=view");
        window.location.reload();
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
