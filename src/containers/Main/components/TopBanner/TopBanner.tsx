import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string-for-all";
import styled from "styled-components";

import { useMainPageTopBannerHooks } from "../../hooks/useMainPageTopBannerHooks";
import Row from "../../../../components/Row";
import Column from "../../../../components/Column";
import CreateBannerItem from "../CreateBannerItem";
import TopBannerList from "./TopBannerList";
import SaveButton from "../Common/SaveButton";
import Pagination from "../../../../components/Pagination/Pagination";

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
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

  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const pageNationLength = topBannerList
    ? Math.ceil(topBannerList!.total_records / 10)
    : 0;

  const handlePaginationNavigate = (type: string) => {
    switch (type) {
      case "next": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(paginationIndex + 1);
          handleBannerItemFilter("page", paginationIndex + 1);
        }

        return;
      }
      case "next-all": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(pageNationLength);
          handleBannerItemFilter("page", pageNationLength);
        }
        return;
      }
      case "prev": {
        if (paginationIndex !== 1) {
          setPaginationIndex(paginationIndex - 1);
          handleBannerItemFilter("page", paginationIndex - 1);
        }

        return;
      }
      case "prev-all": {
        if (paginationIndex !== 1) {
          setPaginationIndex(1);
          handleBannerItemFilter("page", 1);
        }
        return;
      }
      default:
        return;
    }
  };

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
                <Pagination
                  paginationLength={pageNationLength}
                  paginationIndex={paginationIndex}
                  setPaginationIndex={setPaginationIndex}
                  handleFilter={handleBannerItemFilter}
                  handlePaginationNavigate={handlePaginationNavigate}
                />
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
              <SaveButton onClick={handleCreateTopBannerItem} text="저장" />
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
                text="삭제"
                style={{ backgroundColor: "#868686" }}
              />

              <SaveButton
                onClick={() => {
                  handleModifyTopBannerItem(Number(id));
                }}
                text="저장"
              />
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
