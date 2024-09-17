import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import Row from "../../../components/Row";
import Text from "../../../components/Text";
import { useSubMenuListHooks } from "../../Board/hooks/useSubMenuListHooks";
import { BasicLabelListType } from "../hooks/types";
import CommonTable from "../../../components/Table";
import { parse } from "query-string-for-all";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  min-width: 1236px;
  max-width: 1236px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 34px 43px;
  background: var(--Background-Gray, #f9f9fc);
`;

const FilterTitle = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const Radio = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
  stroke-width: 1px;
  stroke: var(--Line-Gray_2, #acacac);
`;

const SearchTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 115px;
  height: 43px;
  padding: 19px 25px;

  border: 1px solid var(--Line-Gray, #d9d9d9);
  background: #f9f9fc;

  color: var(--Text-Main, #414141);

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  cursor: pointer;
`;

const SearchBox = styled.input`
  display: flex;
  width: 782px;
  height: 43px;
  padding: 19px 25px;
  align-items: center;
  border: 1px solid var(--Image-Gray, #d9d9d9);
  background: var(--Background-Gray, #f9f9fc);

  color: var(--Text-Main, #414141);

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

interface BasicLabelListIProps {
  basicLabelList: BasicLabelListType;
  handleChangeBasicLabelParams: (key: string, value: any) => void;
}

const BasicLabelList: React.FC<BasicLabelListIProps> = (props) => {
  const { basicLabelList, handleChangeBasicLabelParams } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const { group_id, sub_id } = parse(location.search);

  const { basicLabelSubMenuList, getSubBasicLabelList } = useSubMenuListHooks();

  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const pageNationLength = basicLabelList
    ? Math.ceil(basicLabelList!.total_records / 10)
    : 0;

  const handlePaginationNavigate = (type: string) => {
    switch (type) {
      case "next": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(paginationIndex + 1);
          handleChangeBasicLabelParams("page", paginationIndex + 1);
        }

        return;
      }
      case "next-all": {
        if (paginationIndex !== pageNationLength) {
          setPaginationIndex(pageNationLength);
          handleChangeBasicLabelParams("page", pageNationLength);
        }
        return;
      }
      case "prev": {
        if (paginationIndex !== 1) {
          setPaginationIndex(paginationIndex - 1);
          handleChangeBasicLabelParams("page", paginationIndex - 1);
        }

        return;
      }
      case "prev-all": {
        if (paginationIndex !== 1) {
          setPaginationIndex(1);
          handleChangeBasicLabelParams("page", 1);
        }
        return;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    getSubBasicLabelList(group_id ? Number(group_id) : 0);
  }, [group_id]);

  return (
    <Container>
      <FilterContainer>
        <Row gap="24px">
          <FilterTitle>서브 메뉴</FilterTitle>
          <Row gap="8px" align="center">
            <Radio type="radio" checked={false} />
            <Text
              color="#000"
              size="16px"
              weight={400}
              style={{ lineHeight: "25px" }}
            >
              전체
            </Text>
          </Row>
          {basicLabelSubMenuList?.result.map((item, idx) => {
            return (
              <Row gap="8px" align="center" key={idx}>
                <Radio type="radio" />
                <Text
                  color="#000"
                  size="16px"
                  weight={400}
                  style={{ lineHeight: "25px" }}
                >
                  {item.sub_title}
                </Text>
              </Row>
            );
          })}
        </Row>
        <Row gap="24px">
          <FilterTitle>노출 여부</FilterTitle>
          <Row gap="8px" align="center">
            <Radio type="radio" checked={false} />
            <Text
              color="#000"
              size="16px"
              weight={400}
              style={{ lineHeight: "25px" }}
            >
              전체
            </Text>
          </Row>
          <Row gap="8px" align="center">
            <Radio type="radio" />
            <Text
              color="#000"
              size="16px"
              weight={400}
              style={{ lineHeight: "25px" }}
            >
              노출
            </Text>
          </Row>
          <Row gap="8px" align="center">
            <Radio type="radio" />
            <Text
              color="#000"
              size="16px"
              weight={400}
              style={{ lineHeight: "25px" }}
            >
              비노출
            </Text>
          </Row>
        </Row>
        <Row gap="43px">
          <FilterTitle>검색어</FilterTitle>
          <Row gap="8px" align="center">
            <SearchTitle>제목</SearchTitle>
            <SearchBox
              placeholder="검색어를 입력하세요"
              onChange={(e: any) => {}}
            />
            <SearchTitle
              style={{
                justifyContent: "center",
                background: "#3870AA",
                border: "none",
                color: "#fff",
              }}
            >
              검색
            </SearchTitle>
          </Row>
        </Row>
      </FilterContainer>
      <Row justifyContent="space-between">
        <Text size="20px" weight={400}>
          검색 {basicLabelList.records.length}건 / 전체{" "}
          <span style={{ fontWeight: 700 }}>
            {basicLabelList.total_records}
          </span>
          건
        </Text>
        <SearchTitle
          style={{
            justifyContent: "center",
            background: "#3870AA",
            border: "none",
            color: "#fff",
          }}
          onClick={() => {
            navigate(`/label/create${location.search}`);
          }}
        >
          신규 등록
        </SearchTitle>
      </Row>
      <CommonTable
        thElement={
          <React.Fragment>
            <th>ID</th>
            <th>서브 메뉴</th>
            <th>이미지</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>노출상태</th>
            <th>등록일</th>
          </React.Fragment>
        }
        tdElement={
          <React.Fragment>
            {basicLabelList.records.map((item, idx) => {
              return (
                <tr
                  className="item"
                  key={idx}
                  onClick={() =>
                    navigate(
                      `/basicLabel/detail/${item.id}?group_id=${group_id}&sub_id=${sub_id}`
                    )
                  }
                >
                  <td style={{ maxWidth: "65px" }}>{item.id}</td>
                  <td style={{ maxWidth: "65px" }}>{item.sub_id}</td>
                  <td style={{ maxWidth: "115px" }}>
                    <img
                      src={item.main_img}
                      alt="main img"
                      style={{ width: "55px" }}
                    />
                  </td>
                  <td style={{ minWidth: "150px" }}>{item.title}</td>
                  <td style={{ minWidth: "485px" }}>{item.desc}</td>
                  <td style={{ maxWidth: "105px" }}>{item.user_id}</td>
                  <td style={{ maxWidth: "115px" }}>{item.is_show}</td>
                  <td style={{ maxWidth: "125px" }}>
                    {dayjs(item.created_at).format("YY.MM.DD")}
                  </td>
                </tr>
              );
            })}
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default BasicLabelList;
