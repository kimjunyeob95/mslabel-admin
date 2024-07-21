import React from "react";
import queryString from "query-string-for-all";
import styled from "styled-components";

import { useMainPageTopBannerHooks } from "../../hooks/useMainPageTopBannerHooks";
import Row from "../../../../components/Row";
import Column from "../../../../components/Column";
import CreateBannerItem from "../CreateBannerItem";
import { useLocation } from "react-router-dom";
import TopBannerList from "./TopBannerList";

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
`;

const TopBanner = () => {
  const {
    topBannerList,
    topBannerItems,
    handleOnChangeTopBannerItems,
    handleCreateTopBannerItem,
  } = useMainPageTopBannerHooks();

  const location = useLocation();
  const { content } = queryString.parse(location.search);

  console.log(content, location, "query");

  const renderTopBannerContents = (): JSX.Element => {
    switch (content) {
      case "view": {
        return (
          <React.Fragment>
            {topBannerList && <TopBannerList topBannerList={topBannerList} />}
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
