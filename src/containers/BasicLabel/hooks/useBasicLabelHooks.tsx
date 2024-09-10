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
  const params = useParams<{ contents: string }>();

  const navigate = useNavigate();
  const { content, id } = parse(location.search);

  const [basicLabelList, setBasicLabelList] = useState<BasicLabelListType>();
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
    console.log(key, value);
    setBasicLabelParams({ ...basicLabelParams, [key]: value });
  };

  const handleGetBasicLabelList = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_PRODUCT}?group_id=3&sub_id=${params.contents}&page=1&page_size=20&sort=created_at|desc`
      );

      if (response) {
        setBasicLabelList(response.data.data);
        console.log(JSON.stringify(response.data.data), response, "<<<<");
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
        navigate("/basicLabel/all?content=list");
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
      console.log(error, "<<<");
    }
  };

  useEffect(() => {
    handleGetBasicLabelList();
  }, [params.contents]);

  return {
    basicLabelList,
    basicLabelParams,
    handleChangeBasicLabelParams,
    handleCreateBasicLabel,
  };
};
