import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../api/api";
import { ADMIN_BOARD_DETAIL } from "../../../utils/constants/apiKey";
import { EstimateDetailType } from "./types";

export interface ReplyParams {
  reply_type: number;
  desc: string;
}

export const useEstimateDetailHooks = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [boardDetailItem, setBoardDetailItem] = useState<EstimateDetailType>();
  const [replyParams, setReplyParams] = useState<ReplyParams>({
    reply_type: 1,
    desc: "안녕하세요 고객님, 명성라벨입니다.\n\n견적 문의 주셔서 감사합니다.\n\n해당 건 전화로 견적문의 완료 드렸습니다.\n추가 문의사항은 02-2279-1701로 전화 부탁드립니다.\n\n고객의 성공이 명성의 성공입니다.\n앞으로도 많은 관심 부탁드립니다.\n\n좋은 하루 보내세요. 감사합니다 :) ",
  });

  const handleGetBasicLabelDetailItem = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_DETAIL}/board/${params.id}`
      );

      if (response) {
        const resultData = response.data.data;

        setBoardDetailItem(resultData);

        console.log(JSON.stringify(resultData));
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  const handleEstimateReply = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_BOARD_DETAIL}/reply/${params.id}`,
        replyParams
      );

      if (response) {
        navigate(`/estimate?group_id=5&sub_id=12`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBasicLabelDetailItem();
  }, []);

  return { boardDetailItem, replyParams, setReplyParams, handleEstimateReply };
};
