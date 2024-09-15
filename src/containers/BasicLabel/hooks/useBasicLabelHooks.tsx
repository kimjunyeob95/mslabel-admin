import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { ADMIN_BOARD_PRODUCT } from "../../../utils/constants/apiKey";
import { parse } from "query-string-for-all";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BasicLabelListType } from "./types";

export interface BasicLabelParams {
  sub_id: number;
  title: string;
  is_show: string;
  desc: string;
  main_img: any;
  bottom_img1: any;
  bottom_img2?: any;
  bottom_img3?: any;
  bottom_img4?: any;
  bottom_img5?: any;
  material: string;
  size: string;
  shape: string;
  keywords: string;
}

export const useBasicLabelHooks = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { group_id, sub_id } = parse(location.search);

  const [basicLabelList, setBasicLabelList] = useState<BasicLabelListType>();
  const [pageSize, setPageSize] = useState<number>(1);
  const [basicLabelParams, setBasicLabelParams] = useState<BasicLabelParams>({
    sub_id: 0,
    title: "",
    is_show: "",
    desc: "",
    main_img: "",
    bottom_img1: "",
    material: "",
    size: "",
    shape: "",
    keywords: "",
  });

  const handleChangeBasicLabelParams = (key: string, value: any) => {
    setBasicLabelParams({ ...basicLabelParams, [key]: value });
  };

  const handleGetBasicLabelList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_PRODUCT}?group_id=${group_id}&sub_id=${sub_id}&page=${pageSize}&page_size=10&sort=created_at|desc`
      );

      if (response) {
        setBasicLabelList(response.data.data);
      }
    } catch (error) {
      console.log(error, "<<<");
    }
  };

  const handleCreateBasicLabel = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_BOARD_PRODUCT}/create`,
        basicLabelParams,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate(
          `/label/${
            response.data.data.group_id === 3 ? "basic" : "digital"
          }?group_id=${response.data.data.group_id}&sub_id=${
            response.data.data.sub_id
          }`
        );
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
      console.log(error, "<<<");
    }
  };

  useEffect(() => {
    handleGetBasicLabelList();
  }, [group_id, sub_id]);

  return {
    basicLabelList,
    basicLabelParams,
    handleChangeBasicLabelParams,
    handleCreateBasicLabel,
  };
};
