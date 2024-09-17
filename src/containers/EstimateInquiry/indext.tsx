import React from "react";
import styled from "styled-components";
import Row from "../../components/Row";
import { useEstimateListHooks } from "./hooks/useEstimateListHooks";
import CommonTable from "../../components/Table";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 66px;
  padding: 27px;
  margin-left: 40px;
  width: 100%;
  max-width: 1470px;
`;

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
`;

const ReplyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: #fff;
  background: var(--Accent-Blue_main, #3870aa);
  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const EstimateInquiryPage = () => {
  const { estimateList } = useEstimateListHooks();

  const navigate = useNavigate();

  console.log(estimateList, "<");
  return (
    <Container>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>견적문의</Title>
      </Row>
      {estimateList && (
        <CommonTable
          thElement={
            <React.Fragment>
              <th>카테고리</th>
              <th>회사명</th>
              <th>이름</th>
              <th>휴대폰번호</th>
              <th>작성 일시</th>
              <th>답변여부</th>
              <th>답변</th>
              <th>답변일시</th>
            </React.Fragment>
          }
          tdElement={
            <React.Fragment>
              {estimateList.records?.map((item, idx) => {
                return (
                  <tr
                    className="item"
                    key={idx}
                    onClick={() => {
                      navigate(
                        `/estimate/detail/${item.id}?sub_id=${item.sub_id}`
                      );
                    }}
                  >
                    <td style={{ minWidth: "485px" }}>
                      {item.categories!.map((item) => item.title).join(",")}
                    </td>
                    <td style={{ minWidth: "185px" }}>{item.company}</td>
                    <td style={{ maxWidth: "95px" }}>{item.contact_name}</td>
                    <td style={{ minWidth: "150px" }}>{item.contact_phone}</td>
                    <td style={{ minWidth: "150px" }}>
                      {dayjs(item.created_at).format("YY.MM.DD HH:mm")}
                    </td>
                    <td style={{ maxWidth: "105px" }}>
                      {item.is_reply === "N" ? (
                        "준비중"
                      ) : (
                        <ReplyButton>답변완료</ReplyButton>
                      )}
                    </td>
                    <td style={{ maxWidth: "115px" }}>
                      {item.is_reply === "N" ? (
                        "준비중"
                      ) : (
                        <ReplyButton>답변완료</ReplyButton>
                      )}
                    </td>
                    <td style={{ maxWidth: "125px" }}>
                      {dayjs(item.updated_at).format("YY.MM.DD HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          }
        />
      )}
    </Container>
  );
};

export default EstimateInquiryPage;
