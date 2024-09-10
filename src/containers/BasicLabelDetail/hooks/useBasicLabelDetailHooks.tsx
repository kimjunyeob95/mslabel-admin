import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecordsEntity } from "../../BasicLabel/hooks/types";
import { instance } from "../../../api/api";
import { ADMIN_BOARD_DETAIL } from "../../../utils/constants/apiKey";

export const useBasicLabelDetailHooks = () => {
  const params = useParams<{ id: string }>();

  const [basicLabelDetailItem, setBasicLabelDetailItem] =
    useState<RecordsEntity>();

  const handleGetBasicLabelDetailItem = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_DETAIL}/product/${params.id}`
      );

      if (response) {
        setBasicLabelDetailItem(response.data.data);
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  useEffect(() => {
    handleGetBasicLabelDetailItem();
  }, []);

  return { basicLabelDetailItem };
};
