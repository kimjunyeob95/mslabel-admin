import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Row from "../../../../components/Row";
import CommonTable from "../../../../components/Table";
import Text from "../../../../components/Text";
import { BannerFilter, Introduce, RecordsEntity } from "../../hooks/types";

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

interface IntroduceListIProps {
  introduceList: Introduce;
  introduceFilter: BannerFilter;
  handleIntroduceFilter: (key: string, value: string) => void;
  handleFilterIntroduceItems: () => void;
  handleNavigateToEditPage: (item: RecordsEntity) => void;
}

const IntroduceList: React.FC<IntroduceListIProps> = (props) => {
  const {
    introduceList,
    introduceFilter,
    handleIntroduceFilter,
    handleFilterIntroduceItems,
    handleNavigateToEditPage,
  } = props;

  const navigate = useNavigate();

  return (
    <Container>
      <FilterContainer>
        <Row gap="24px">
          <FilterTitle>노출 여부</FilterTitle>
          <Row gap="8px" align="center">
            <Radio
              type="radio"
              checked={introduceFilter.is_show === ""}
              onChange={() => handleIntroduceFilter("is_show", "")}
            />
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
            <Radio
              type="radio"
              checked={introduceFilter.is_show === "Y"}
              onChange={() => handleIntroduceFilter("is_show", "Y")}
            />
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
            <Radio
              type="radio"
              checked={introduceFilter.is_show === "N"}
              onChange={() => handleIntroduceFilter("is_show", "N")}
            />
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
              value={introduceFilter.keyword}
              onChange={(e: any) => {
                handleIntroduceFilter("keyword", e.target.value);
              }}
            />
            <SearchTitle
              style={{
                justifyContent: "center",
                background: "#3870AA",
                border: "none",
                color: "#fff",
              }}
              onClick={handleFilterIntroduceItems}
            >
              검색
            </SearchTitle>
          </Row>
        </Row>
      </FilterContainer>
      <Row justifyContent="space-between">
        <Text size="20px" weight={400}>
          검색 {introduceList.records.length}건 / 전체{" "}
          <span style={{ fontWeight: 700 }}>{introduceList.total_records}</span>
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
            navigate("/main/introduce?content=create");
          }}
        >
          신규 등록
        </SearchTitle>
      </Row>
      <CommonTable
        thElement={
          <React.Fragment>
            <th>ID</th>
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
            {introduceList.records.map((item, idx) => {
              return (
                <tr
                  className="item"
                  key={idx}
                  onClick={() => handleNavigateToEditPage(item)}
                >
                  <td style={{ maxWidth: "65px" }}>{item.id}</td>
                  <td>
                    <img
                      src={item.img_url}
                      alt={`image thumbnail ${idx}`}
                      style={{ width: "150px", height: "43px" }}
                    />
                  </td>
                  <td style={{ minWidth: "226px", textAlign: "left" }}>
                    {item.title}
                  </td>
                  <td
                    style={{
                      minWidth: "331px",
                      textAlign: "left",
                      whiteSpace: "wrap",
                    }}
                  >
                    {item.desc}
                  </td>
                  <td>{item.admin_user.user_name}</td>
                  <td>
                    <SearchTitle
                      style={{
                        justifyContent: "center",
                        background:
                          item.is_show === "Y" ? "#3870AA" : "#D9D9D9",
                        width: "85px",
                        border: "none",
                        color: item.is_show === "Y" ? "#fff" : "#868686",
                      }}
                    >
                      {item.is_show === "Y" ? "노출" : "비노출"}
                    </SearchTitle>
                  </td>
                  <td>{dayjs(item.created_at).format("YY.MM.DD")}</td>
                </tr>
              );
            })}
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default IntroduceList;
