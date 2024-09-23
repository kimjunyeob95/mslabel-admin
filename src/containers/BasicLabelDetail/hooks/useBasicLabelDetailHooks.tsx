import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecordsEntity } from "../../BasicLabel/hooks/types";
import { instance } from "../../../api/api";
import {
  ADMIN_BOARD_DETAIL,
  ADMIN_BOARD_PRODUCT,
} from "../../../utils/constants/apiKey";
import { BasicLabelParams } from "../../BasicLabel/hooks/useBasicLabelHooks";

export const useBasicLabelDetailHooks = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [basicLabelDetailItem, setBasicLabelDetailItem] =
    useState<RecordsEntity>();
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

  const handleGetBasicLabelDetailItem = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_BOARD_DETAIL}/product/${params.id}`
      );

      if (response) {
        setBasicLabelDetailItem(response.data.data);

        const resultData: RecordsEntity = response.data.data;

        setBasicLabelParams({
          sub_id: resultData.sub_id,
          title: resultData.title,
          is_show: resultData.is_show,
          desc: resultData.desc,
          main_img: resultData.main_img,
          bottom_img1: resultData.bottom_img1,
          material: resultData.material,
          size: resultData.size,
          shape: resultData.shape,
          keywords: resultData.keywords,
          bottom_img2: resultData.bottom_img2 ? resultData.bottom_img2 : "",
          bottom_img3: resultData.bottom_img3 ? resultData.bottom_img3 : "",
          bottom_img4: resultData.bottom_img4 ? resultData.bottom_img4 : "",
          bottom_img5: resultData.bottom_img5 ? resultData.bottom_img5 : "",
        });
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  const handleChangeBasicLabelParams = (key: string, value: any) => {
    setBasicLabelParams({ ...basicLabelParams, [key]: value });
  };

  const handleUpdateBasicLabel = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_BOARD_PRODUCT}/edit/${params.id}`,
        basicLabelParams,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate(`/label/basic?group_id=3&sub_id=${response.data.data.sub_id}`);
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  const handleDeleteBasicLabel = async () => {
    try {
      const response = await instance.delete(
        `${ADMIN_BOARD_PRODUCT}/delete/${params.id}`
      );

      if (response) {
        navigate(`/label/basic?group_id=3&sub_id=${response.data.data.sub_id}`);
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
    }
  };

  useEffect(() => {
    handleGetBasicLabelDetailItem();
  }, []);

  return {
    basicLabelDetailItem,
    basicLabelParams,
    handleChangeBasicLabelParams,
    handleDeleteBasicLabel,
    handleUpdateBasicLabel,
  };
};
