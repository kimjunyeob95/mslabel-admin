import { useEffect, useState } from "react";
import { parse } from "query-string-for-all";
import { instance } from "../../../api/api";
import { ADMIN_BOARD_BOARD } from "../../../utils/constants/apiKey";
import { EstimateListType } from "./types";

export interface BoardParams {
  group_id: number;
  sub_id: number;
  page: number;
  page_size: number;
  sort: string;
}

export const useEstimateListHooks = () => {
  const { group_id, sub_id } = parse(window.location.search);

  const [estimateList, setEstimateList] = useState<EstimateListType>();
  const [boardParams, setBoardParams] = useState<BoardParams>({
    group_id: group_id ? Number(group_id) : 5,
    sub_id: sub_id ? Number(sub_id) : 12,
    page: 1,
    page_size: 10,
    sort: "created_at|desc",
  });

  const handleGetEstimateList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_BOARD}?group_id=${boardParams.group_id}&sub_id=${boardParams.sub_id}&page=${boardParams.page}&page_size=${boardParams.page_size}&sort=${boardParams.sort}`
      );

      if (response) {
        setEstimateList(response.data.data);
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  useEffect(() => {
    handleGetEstimateList();
  }, []);

  return { estimateList };
};
