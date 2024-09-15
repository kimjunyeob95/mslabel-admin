import React from "react";
import styled from "styled-components";
import Row from "../Row";
import {
  ICON_NEXT,
  ICON_NEXT_ALL,
  ICON_PREV,
  ICON_PREV_ALL,
} from "../../assets/image";

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

interface PaginationIProps {
  paginationLength: number;
  paginationIndex: number;
  setPaginationIndex: React.Dispatch<React.SetStateAction<number>>;
  handlePaginationNavigate: (type: string) => void;
  handleFilter: (key: string, value: any) => void;
}

const Pagination: React.FC<PaginationIProps> = (props) => {
  const {
    paginationLength,
    paginationIndex,
    setPaginationIndex,
    handlePaginationNavigate,
    handleFilter,
  } = props;

  const renderPageNation = () => {
    const element = [];

    for (let i = 1; i <= paginationLength; i++) {
      element.push(
        <PaginationContainer
          key={i}
          $isChecked={i === paginationIndex}
          onClick={() => {
            setPaginationIndex(i);
            handleFilter("page", i);
          }}
        >
          {i}
        </PaginationContainer>
      );
    }

    return element;
  };

  return (
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
  );
};

export default Pagination;
