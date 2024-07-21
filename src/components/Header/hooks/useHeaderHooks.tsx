import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { HeaderItem } from "../../../utils/types/HeaderTypes";

export const useHeaderHooks = () => {
  const [headerItem, setHeaderItem] = useState<HeaderItem[]>();
  const [visibleHeaderItem, setVisibleHeaderItem] =
    useState<string>("게시판관리");

  const handelOnClickHeaderItem = (headerContents: string) => {
    setVisibleHeaderItem(headerContents);
  };

  const getNavigateInformation = async () => {
    try {
      const response = await instance.get("admin/menu/main");

      if (response) {
        setHeaderItem(response.data.data);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getNavigateInformation();
  }, []);

  return {
    headerItem,
    visibleHeaderItem,
    handelOnClickHeaderItem,
  };
};
