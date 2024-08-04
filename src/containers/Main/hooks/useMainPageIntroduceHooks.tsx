import { useEffect, useState } from "react";
import { parse } from "query-string-for-all";

import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../api/api";
import { ADMIN_INTRODUCE } from "../../../utils/constants/apiKey";
import { BannerFilter, Introduce, RecordsEntity } from "./types";

export interface IntroduceParams {
  title: string;
  is_show: string;
  desc: string;
  thumbnail: any;
}

export const useMainPageIntroduceHooks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { content, id } = parse(location.search);

  const [introduceParams, setIntroduceParams] = useState<IntroduceParams>({
    title: "",
    is_show: "Y",
    desc: "",
    thumbnail: null,
  });
  const [introduceFilter, setIntroduceFilter] = useState<BannerFilter>({
    page: 1,
    page_size: 10,
    is_show: "",
    search_cls: "",
    keyword: "",
  });
  const [introduceList, setIntroduceList] = useState<Introduce>();

  const handleOnChangeIntroduceParams = (key: string, value: any) => {
    setIntroduceParams({ ...introduceParams, [key]: value });
  };

  const handleIntroduceFilter = (key: string, value: any) => {
    setIntroduceFilter({ ...introduceFilter, [key]: value });
  };

  const handleGetIntroduceItems = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_INTRODUCE}?page=${introduceFilter.page}&page_size=${introduceFilter.page_size}&search_cls=title`
      );

      if (response) {
        setIntroduceList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterIntroduceItems = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_INTRODUCE}?page=${introduceFilter.page}&page_size=${
          introduceFilter.page_size
        }&search_cls=title${
          introduceFilter.is_show !== ""
            ? `&is_show=${introduceFilter.is_show}`
            : ""
        }${
          introduceFilter.keyword !== ""
            ? `&keyword=${introduceFilter.keyword}`
            : ""
        }`
      );

      if (response) {
        setIntroduceList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateIntroduceItem = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_INTRODUCE}/create`,
        introduceParams,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate("/main/introduce?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyIntroduceItem = async (id: number) => {
    try {
      const response = await instance.post(
        `${ADMIN_INTRODUCE}/edit/${id}`,
        introduceParams,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate("/main/introduce?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteIntroduceItem = async (id: number) => {
    try {
      const response = await instance.delete(`${ADMIN_INTRODUCE}/delete/${id}`);

      if (response) {
        navigate("/main/introduce?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToEditPage = (item: RecordsEntity) => {
    navigate(`/main/introduce?content=edit&id=${item.id}`);

    setIntroduceParams({
      title: item.title,
      is_show: item.is_show,
      desc: item.desc,
      thumbnail: item.img_url,
    });
  };

  useEffect(() => {
    if (introduceList && content === "edit") {
      const filterList = introduceList.records.filter(
        (item) => item.id === Number(id)
      );

      setIntroduceParams({
        title: filterList[0].title,
        is_show: filterList[0].is_show,
        desc: filterList[0].desc,
        thumbnail: filterList[0].img_url,
      });

      return;
    }

    if (introduceList && content === "create") {
      setIntroduceParams({
        title: "",
        is_show: "Y",
        desc: "",
        thumbnail: null,
      });

      return;
    }
  }, [introduceList, content]);

  useEffect(() => {
    handleGetIntroduceItems();
  }, []);

  useEffect(() => {
    handleFilterIntroduceItems();
  }, [introduceFilter.page]);

  return {
    introduceList,
    introduceFilter,
    introduceParams,
    handleOnChangeIntroduceParams,
    handleFilterIntroduceItems,
    handleCreateIntroduceItem,
    handleModifyIntroduceItem,
    handleDeleteIntroduceItem,
    handleNavigateToEditPage,
    handleIntroduceFilter,
  };
};
