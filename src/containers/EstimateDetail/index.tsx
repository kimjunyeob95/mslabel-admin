import React from "react";
import styled from "styled-components";
import Row from "../../components/Row";
import Text from "../../components/Text";
import { useEstimateDetailHooks } from "./hooks/useEstimateDetailHooks";
import dayjs from "dayjs";
import Column from "../../components/Column";

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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid var(--Image-Gray, #d9d9d9);
  border-bottom: 1px solid var(--Image-Gray, #d9d9d9);
  border-left: 1px solid var(--Image-Gray, #d9d9d9);
  background-color: #f9f9fc;
`;

const TitleForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 11px 25px;
  width: 235px;

  color: var(--Text-Main, #414141);

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const ContentsForm = styled.div`
  display: flex;
  width: 1000px;
  padding: 11px 25px;
  align-items: center;
  gap: 10px;
  height: inherit;
  min-height: 65px;
  border-left: 1px solid var(--Image-Gray, #d9d9d9);
  border-right: 1px solid var(--Image-Gray, #d9d9d9);
  background-color: #fff;
`;

const Textarea = styled.textarea`
  display: flex;
  width: 708px;
  height: 142px;
  padding: 8px 25px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: 1px solid var(--Line-Gray, #d9d9d9);
  resize: none;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ReplyForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 17px;
  padding: 34px 43px;

  width: 100%;
  background: var(--Background-Gray, #f9f9fc);
  line-height: 24px;
`;

const Radio = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
  stroke-width: 1px;
  stroke: var(--Line-Gray_2, #acacac);
  cursor: pointer;
`;

const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 25px;
  border: none;
  background: var(--Accent-Blue_main, #3870aa);

  color: #fff;

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const EstimateDetailPage = () => {
  const { boardDetailItem, replyParams, setReplyParams, handleEstimateReply } =
    useEstimateDetailHooks();

  console.log(boardDetailItem, "<");
  return (
    <Container>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>견적문의</Title>
      </Row>
      <Column gap="90px" align="flex-start">
        {boardDetailItem && (
          <Layout>
            <Text color="#000" size="25px" style={{ marginBottom: "10px" }}>
              문의
            </Text>
            <ItemContainer>
              <TitleForm>작성일시</TitleForm>
              <ContentsForm>
                {dayjs(boardDetailItem?.created_at).format("YYYY.MM.DD HH:mm")}
              </ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>회사명</TitleForm>
              <ContentsForm>{boardDetailItem?.company}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>담당자 성명</TitleForm>
              <ContentsForm>{boardDetailItem.contact_name}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>이메일 주소</TitleForm>
              <ContentsForm>{boardDetailItem.contact_email}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>제목</TitleForm>
              <ContentsForm>{boardDetailItem.title}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>카테고리</TitleForm>
              <ContentsForm>
                {boardDetailItem
                  .categories!.map((item) => item.title)
                  .join(",")}
              </ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>제품 규격</TitleForm>
              <ContentsForm>{boardDetailItem.size}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>제품 용도</TitleForm>
              <ContentsForm>{boardDetailItem.purpose}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>원단 및 코팅 여부</TitleForm>
              <ContentsForm>{boardDetailItem.material}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>가공 형태</TitleForm>
              <ContentsForm>{boardDetailItem.shape}</ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>기타 문의사항</TitleForm>
              <ContentsForm>
                <Textarea readOnly value={boardDetailItem.desc} />
              </ContentsForm>
            </ItemContainer>
            <ItemContainer>
              <TitleForm>첨부파일</TitleForm>
              <ContentsForm>
                <img
                  src={boardDetailItem.etc_file}
                  alt="etc file thumbnail"
                  style={{ width: "105px" }}
                />
              </ContentsForm>
            </ItemContainer>
          </Layout>
        )}
        <Column gap="15px" align="flex-start" style={{ width: "100%" }}>
          <Column gap="25px" align="flex-start" style={{ width: "100%" }}>
            <Text size="25px">
              답변 * <span style={{ color: "#f00" }}>(1,2,3 중 선택 필수)</span>
            </Text>
            <ReplyForm>
              <Row gap="40px">
                <Text size="16px">답변 1</Text>
                <Row gap="8px">
                  <Radio
                    type="radio"
                    checked={replyParams.reply_type === 1}
                    onChange={() =>
                      setReplyParams({ ...replyParams, reply_type: 1 })
                    }
                  />
                  <Text size="16px" weight={400}>
                    전화 통화 완료
                  </Text>
                </Row>
              </Row>
              <Row gap="40px">
                <Text size="16px">답변 2</Text>
                <Row gap="8px">
                  <Radio
                    type="radio"
                    checked={replyParams.reply_type === 2}
                    onChange={() =>
                      setReplyParams({ ...replyParams, reply_type: 2 })
                    }
                  />
                  <Text size="16px" weight={400}>
                    이메일 전송 완료
                  </Text>
                </Row>
              </Row>
              <Row gap="40px">
                <Text size="16px">답변 3</Text>
                <Row gap="8px">
                  <Radio
                    type="radio"
                    checked={replyParams.reply_type === 3}
                    onChange={() =>
                      setReplyParams({ ...replyParams, reply_type: 3 })
                    }
                  />
                  <Text size="16px" weight={400}>
                    직접 입력
                  </Text>
                </Row>
              </Row>
            </ReplyForm>
          </Column>
          <ReplyForm>
            안녕하세요 고객님, 명성라벨입니다.
            <br />
            <br />
            견적 문의 주셔서 감사합니다. <br />
            <br />
            해당 건 전화로 견적문의 완료 드렸습니다. <br />
            추가 문의사항은 02-2279-1701로 전화 부탁드립니다. <br />
            <br />
            고객의 성공이 명성의 성공입니다.
            <br /> 앞으로도 많은 관심 부탁드립니다.
            <br />
            <br /> 좋은 하루 보내세요. 감사합니다 {`:)`}
          </ReplyForm>
          <Row
            style={{ marginTop: "40px", width: "100%" }}
            justifyContent="flex-end"
          >
            <ReplyButton onClick={handleEstimateReply}>답변 등록</ReplyButton>
          </Row>
        </Column>
      </Column>
    </Container>
  );
};

export default EstimateDetailPage;
