import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { parse } from "query-string-for-all";

import Column from "../../../../components/Column";
import Row from "../../../../components/Row";
import {
  ICON_NEXT,
  ICON_NEXT_ALL,
  ICON_PREV,
  ICON_PREV_ALL,
} from "../../../../assets/image";
import IntroduceList from "./IntroduceList";
import { useMainPageIntroduceHooks } from "../../hooks/useMainPageIntroduceHooks";
import CreateIntroduceItem from "./CreateIntroduceItem";
import SaveButton from "../Common/SaveButton";

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
`;

const PaginationContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.$isChecked ? "#000" : "#868686")};
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px; /* 271.429% */
  text-decoration-line: ${(props) => (props.$isChecked ? "underline" : "none")};
  cursor: pointer;
`;

const ArrowImage = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const Introduce = () => {
  const location = useLocation();
  const { content, id } = parse(location.search);

  const {
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
  } = useMainPageIntroduceHooks();

  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const pageNationLength = introduceList
    ? Math.ceil(introduceList!.total_records / 10)
    : 0;

  const handlePaginationNavigate = (type: string) => {
    switch (type) {
      case "next": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(paginationIndex + 1);
          handleIntroduceFilter("page", paginationIndex + 1);
        }

        return;
      }
      case "next-all": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(pageNationLength);
          handleIntroduceFilter("page", pageNationLength);
        }
        return;
      }
      case "prev": {
        if (paginationIndex !== 1) {
          setPaginationIndex(paginationIndex - 1);
          handleIntroduceFilter("page", paginationIndex - 1);
        }

        return;
      }
      case "prev-all": {
        if (paginationIndex !== 1) {
          setPaginationIndex(1);
          handleIntroduceFilter("page", 1);
        }
        return;
      }
      default:
        return;
    }
  };

  const renderPageNation = () => {
    const element = [];

    for (let i = 1; i <= pageNationLength; i++) {
      element.push(
        <PaginationContainer
          key={i}
          $isChecked={i === paginationIndex}
          onClick={() => {
            setPaginationIndex(i);
            handleIntroduceFilter("page", i);
          }}
        >
          {i}
        </PaginationContainer>
      );
    }

    return element;
  };

  const renderTopBannerContents = (): JSX.Element => {
    switch (content) {
      case "view": {
        return (
          <React.Fragment>
            {introduceList && (
              <Column gap="40px">
                <IntroduceList
                  introduceList={introduceList}
                  introduceFilter={introduceFilter}
                  handleIntroduceFilter={handleIntroduceFilter}
                  handleFilterIntroduceItems={handleFilterIntroduceItems}
                  handleNavigateToEditPage={handleNavigateToEditPage}
                />
                <Row gap="16px">
                  <Row gap="8px">
                    <ArrowImage
                      src={ICON_PREV_ALL}
                      alt="prev page all"
                      onClick={() => handlePaginationNavigate("prev-all")}
                    />
                    <ArrowImage
                      src={ICON_PREV}
                      alt="prev page"
                      onClick={() => handlePaginationNavigate("prev")}
                    />
                  </Row>
                  {renderPageNation()}
                  <Row gap="8px">
                    <ArrowImage
                      src={ICON_NEXT}
                      alt="next page"
                      onClick={() => handlePaginationNavigate("next")}
                    />
                    <ArrowImage
                      src={ICON_NEXT_ALL}
                      alt="next page all"
                      onClick={() => handlePaginationNavigate("next-all")}
                    />
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
            <CreateIntroduceItem
              introduceParams={introduceParams}
              handleOnChangeIntroduceParams={handleOnChangeIntroduceParams}
            />
            <Row justifyContent="flex-end" style={{ width: "1235px" }}>
              <SaveButton
                onClick={() => {
                  handleCreateIntroduceItem();
                }}
                text="저장"
              />
            </Row>
          </React.Fragment>
        );
      }
      case "edit": {
        return (
          <React.Fragment>
            <CreateIntroduceItem
              introduceParams={introduceParams}
              handleOnChangeIntroduceParams={handleOnChangeIntroduceParams}
            />
            <Row
              gap="14px"
              justifyContent="flex-end"
              style={{ width: "1235px" }}
            >
              <SaveButton
                onClick={() => {
                  handleDeleteIntroduceItem(Number(id));
                }}
                text="삭제"
                style={{ backgroundColor: "#868686" }}
              />

              <SaveButton
                onClick={() => {
                  handleModifyIntroduceItem(Number(id));
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
        <Title>소개_명성은 이런 일을 합니다</Title>
      </Row>
      <Column gap="40px">{renderTopBannerContents()}</Column>
    </React.Fragment>
  );
};

export default Introduce;
