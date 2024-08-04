import { parse } from "query-string-for-all";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../api/api";
import { ADMIN_TOP_BANNER } from "../../../utils/constants/apiKey";
import { BannerFilter, RecordsEntity, TopBanner } from "./types";

export interface TopBannerItems {
  title: string;
  is_show: string;
  is_always_show: string;
  show_started_at: string;
  show_ended_at: string;
  thumbnail: any;
}

export const useMainPageTopBannerHooks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { content, id } = parse(location.search);

  const [topBannerItems, setTopBannerItems] = useState<TopBannerItems>({
    title: "",
    is_show: "Y",
    is_always_show: "N",
    show_started_at: "",
    show_ended_at: "",
    thumbnail: null,
  });
  const [topBannerList, setTopBannerList] = useState<TopBanner>();
  const [bannerFilter, setBannerFilter] = useState<BannerFilter>({
    page: 1,
    page_size: 10,
    is_show: "",
    search_cls: "",
    keyword: "",
  });

  const handleOnChangeTopBannerItems = (id: string, value: any) => {
    setTopBannerItems({ ...topBannerItems, [id]: value });
  };

  const handleBannerItemFilter = (key: string, value: any) => {
    setBannerFilter({ ...bannerFilter, [key]: value });
  };

  const handleGetTopBannerItems = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_TOP_BANNER}?page=${bannerFilter.page}&page_size=${bannerFilter.page_size}&search_cls=title`
      );

      if (response) {
        setTopBannerList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterTopBannerItems = async () => {
    try {
      const response = await instance.get(
        `${ADMIN_TOP_BANNER}?page=${bannerFilter.page}&page_size=${
          bannerFilter.page_size
        }&search_cls=title${
          bannerFilter.is_show !== "" ? `&is_show=${bannerFilter.is_show}` : ""
        }${
          bannerFilter.keyword !== "" ? `&keyword=${bannerFilter.keyword}` : ""
        }`
      );

      if (response) {
        setTopBannerList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTopBannerItem = async () => {
    try {
      const response = await instance.post(
        `${ADMIN_TOP_BANNER}/create`,
        topBannerItems,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate("/main/banner?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyTopBannerItem = async (id: number) => {
    try {
      const response = await instance.post(
        `${ADMIN_TOP_BANNER}/edit/${id}`,
        topBannerItems,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate("/main/banner?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTopBannerItem = async (id: number) => {
    try {
      const response = await instance.delete(
        `${ADMIN_TOP_BANNER}/delete/${id}`
      );

      if (response) {
        navigate("/main/banner?content=view");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToEditPage = (item: RecordsEntity) => {
    navigate(`/main/banner?content=edit&id=${item.id}`);

    setTopBannerItems({
      title: item.title,
      is_show: item.is_show,
      is_always_show: item.is_always_show,
      show_started_at: item.show_started_at,
      show_ended_at: item.show_ended_at,
      thumbnail: item.img_url,
    });
  };

  useEffect(() => {
    handleGetTopBannerItems();
  }, []);

  useEffect(() => {
    if (topBannerList && content === "edit") {
      const filterList = topBannerList.records.filter(
        (item) => item.id === Number(id)
      );

      setTopBannerItems({
        title: filterList[0].title,
        is_show: filterList[0].is_show,
        is_always_show: filterList[0].is_always_show,
        show_started_at: filterList[0].show_started_at,
        show_ended_at: filterList[0].show_ended_at,
        thumbnail: filterList[0].img_url,
      });

      return;
    }

    if (topBannerList && content === "create") {
      setTopBannerItems({
        title: "",
        is_show: "Y",
        is_always_show: "N",
        show_started_at: "",
        show_ended_at: "",
        thumbnail: null,
      });

      return;
    }
  }, [topBannerList, content]);

  useEffect(() => {
    handleFilterTopBannerItems();
  }, [bannerFilter.page]);

  return {
    topBannerItems,
    topBannerList,
    bannerFilter,
    handleOnChangeTopBannerItems,
    handleBannerItemFilter,
    handleFilterTopBannerItems,
    handleCreateTopBannerItem,
    handleModifyTopBannerItem,
    handleDeleteTopBannerItem,
    handleNavigateToEditPage,
  };
};
