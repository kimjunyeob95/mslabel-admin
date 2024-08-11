import React from "react";
import styled from "styled-components";

import Row from "../../../../components/Row";
import { Introduce2Params } from "../../hooks/useMainPageIntroduce2Hooks";
import Column from "../../../../components/Column";

const Container = styled.div`
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
  padding: 19px 25px;
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
  padding: 19px 25px;
  align-items: center;
  gap: 10px;
  height: inherit;
  min-height: 65px;
  border-left: 1px solid var(--Image-Gray, #d9d9d9);
  border-right: 1px solid var(--Image-Gray, #d9d9d9);
  background-color: #fff;

  .input-file-button {
    display: flex;
    width: 86px;
    height: 36px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border: 1px solid var(--Line-Gray_2, #acacac);
    background: var(--Image-Gray, #d9d9d9);
    color: var(--Text-Gray_sub, #868686);

    /* Content txt */
    font-family: "Spoqa Han Sans Neo";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const InputForm = styled.input`
  display: flex;
  width: 708px;
  padding: 8px 25px;
  align-items: center;
  gap: 10px;

  ::placeholder {
    color: var(--Text-Main, #414141);

    /* Content txt */
    font-family: "Spoqa Han Sans Neo";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  stroke-width: 1px;
  stroke: var(--Line-Gray_2, #acacac);
`;

interface CreateIntroduce2ItemIProps {
  introduceParams: Introduce2Params;
  handleOnChangeIntroduceParams: (key: string, value: any) => void;
}

const CreateIntroduce2Item: React.FC<CreateIntroduce2ItemIProps> = (props) => {
  const { introduceParams, handleOnChangeIntroduceParams } = props;

  const hanldeImageUpload = (event: any) => {
    const file = event.target.files[0];

    handleOnChangeIntroduceParams("thumbnail", file);
  };

  return (
    <Container>
      <ItemContainer>
        <TitleForm>제목</TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="제목을 입력해주세요."
            onChange={(e: any) => {
              handleOnChangeIntroduceParams("title", e.target.value);
            }}
            value={introduceParams.title}
          />
          {introduceParams.title.length}/25
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>노출여부</TitleForm>
        <ContentsForm>
          <Row gap="24px">
            <Row gap="8px">
              <Radio
                type="radio"
                defaultChecked={introduceParams.is_show === "Y"}
                checked={introduceParams.is_show === "Y"}
                onChange={() => {
                  handleOnChangeIntroduceParams("is_show", "Y");
                }}
              />
              노출
            </Row>
            <Row gap="8px">
              <Radio
                type="radio"
                defaultChecked={introduceParams.is_show === "N"}
                checked={introduceParams.is_show === "N"}
                onChange={() => {
                  handleOnChangeIntroduceParams("is_show", "N");
                }}
              />
              비노출
            </Row>
          </Row>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>썸네일</TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file">
                파일선택
              </label>
              <input
                type="file"
                id="input-file"
                style={{ display: "none" }}
                onChange={hanldeImageUpload}
              />
              (사이즈 : 293x581(px), 용량 2MB이하, 형식: jpg, png)
            </Row>
            {introduceParams.thumbnail &&
              !(introduceParams.thumbnail instanceof File) && (
                <img
                  src={introduceParams.thumbnail}
                  alt="introduce thumbnail"
                  style={{ width: "82px" }}
                />
              )}
          </Column>
        </ContentsForm>
      </ItemContainer>
    </Container>
  );
};

export default CreateIntroduce2Item;
