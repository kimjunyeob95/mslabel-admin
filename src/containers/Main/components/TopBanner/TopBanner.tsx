import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string-for-all";
import styled from "styled-components";

import { useMainPageTopBannerHooks } from "../../hooks/useMainPageTopBannerHooks";
import Row from "../../../../components/Row";
import Column from "../../../../components/Column";
import CreateBannerItem from "../CreateBannerItem";
import TopBannerList from "./TopBannerList";
import {
  ICON_NEXT,
  ICON_NEXT_ALL,
  ICON_PREV,
  ICON_PREV_ALL,
} from "../../../../assets/svg";

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 56px;
  background: var(--Accent-Blue_main, #3870aa);

  color: #fff;

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */

  cursor: pointer;
`;

const TopBanner = () => {
  const {
    topBannerList,
    topBannerItems,
    bannerFilter,
    handleOnChangeTopBannerItems,
    handleBannerItemFilter,
    handleFilterTopBannerItems,
    handleCreateTopBannerItem,
    handleModifyTopBannerItem,
    handleDeleteTopBannerItem,
    handleNavigateToEditPage,
  } = useMainPageTopBannerHooks();

  const location = useLocation();
  const { content, id } = queryString.parse(location.search);

  const renderTopBannerContents = (): JSX.Element => {
    switch (content) {
      case "view": {
        return (
          <React.Fragment>
            {topBannerList && (
              <Column gap="40px">
                <TopBannerList
                  topBannerList={topBannerList}
                  bannerFilter={bannerFilter}
                  handleBannerItemFilter={handleBannerItemFilter}
                  handleNavigateToEditPage={handleNavigateToEditPage}
                  handleFilterTopBannerItems={handleFilterTopBannerItems}
                />
                <Row gap="16px">
                  <Row gap="8px">
                    <img src={ICON_PREV_ALL} alt="prev page all" />
                    <img src={ICON_PREV} alt="prev page" />
                  </Row>
                  <Row gap="8px">
                    <img src={ICON_NEXT} alt="next page" />
                    <img src={ICON_NEXT_ALL} alt="next page all" />
                  </Row>
                </Row>
              </Column>
            )}
          </React.Fragment>
        );
      }
      case "create": {
        return (
          <React.Fragment>
            <CreateBannerItem
              topBannerItems={topBannerItems}
              handleOnChangeTopBannerItems={handleOnChangeTopBannerItems}
            />
            <Row justifyContent="flex-end" style={{ width: "1235px" }}>
              <SaveButton onClick={handleCreateTopBannerItem}>저장</SaveButton>
            </Row>
          </React.Fragment>
        );
      }
      case "edit": {
        return (
          <React.Fragment>
            <CreateBannerItem
              topBannerItems={topBannerItems}
              handleOnChangeTopBannerItems={handleOnChangeTopBannerItems}
            />
            <Row
              gap="14px"
              justifyContent="flex-end"
              style={{ width: "1235px" }}
            >
              <SaveButton
                onClick={() => {
                  handleDeleteTopBannerItem(Number(id));
                }}
                style={{ backgroundColor: "#868686" }}
              >
                삭제
              </SaveButton>
              <SaveButton
                onClick={() => {
                  handleModifyTopBannerItem(Number(id));
                }}
              >
                저장
              </SaveButton>
            </Row>
          </React.Fragment>
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <React.Fragment>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>상단배너</Title>
      </Row>
      <Column gap="40px">{renderTopBannerContents()}</Column>
    </React.Fragment>
  );
};

export default TopBanner;
