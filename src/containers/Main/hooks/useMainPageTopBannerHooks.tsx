import { useEffect, useState } from "react";
import { instance } from "../../../api/api";
import { BannerFilter, TopBanner } from "./types";

export interface TopBannerItems {
  title: string;
  is_show: string;
  is_always_show: string;
  show_started_at: string;
  show_ended_at: string;
  thumbnail: any;
}

export const useMainPageTopBannerHooks = () => {
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
    page_size: 20,
    is_show: "",
    search_cls: "",
    keyword: "",
  });

  const handleOnChangeTopBannerItems = (id: string, value: any) => {
    setTopBannerItems({ ...topBannerItems, [id]: value });
  };

  const handleGetTopBannerItems = async () => {
    try {
      const response = await instance.get(
        `/admin/main/topBanners?page=${bannerFilter.page}&page_size=${bannerFilter.page_size}`
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
      const response = await instance.post("/admin/main/topBanners/create", {
        title: topBannerItems.title,
        is_show: topBannerItems.is_show,
        is_always_show: topBannerItems.is_always_show,
        show_started_at: topBannerItems.show_started_at,
        show_ended_at: topBannerItems.show_ended_at,
        thumbnail: topBannerItems.thumbnail,
      });

      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTopBannerItems();
  }, []);

  return {
    topBannerItems,
    topBannerList,
    handleOnChangeTopBannerItems,
    handleCreateTopBannerItem,
  };
};
