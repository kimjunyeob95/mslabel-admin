import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import Row from "../../../components/Row";
import { TopBannerItems } from "../hooks/useMainPageTopBannerHooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 19px 25px;
  width: 235px;
  height: 56px;

  border-top: 1px solid var(--Image-Gray, #d9d9d9);
  border-bottom: 1px solid var(--Image-Gray, #d9d9d9);
  border-left: 1px solid var(--Image-Gray, #d9d9d9);
  background: var(--Background-Gray, #f9f9fc);

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
  height: 56px;
  padding: 19px 25px;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--Image-Gray, #d9d9d9);

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

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #acacac;
`;

const Calendar = styled.input`
  display: flex;
  width: 129px;
  height: 40px;
  padding: 8px 12px;
  align-items: center;
  gap: 10px;
`;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  stroke-width: 1px;
  stroke: var(--Line-Gray_2, #acacac);
`;

interface CreateBannerItemIProps {
  topBannerItems: TopBannerItems;
  handleOnChangeTopBannerItems: (id: string, value: any) => void;
}

const CreateBannerItem: React.FC<CreateBannerItemIProps> = (props) => {
  const { topBannerItems, handleOnChangeTopBannerItems } = props;

  const [checked, setChecked] = useState<boolean>(false);
  const [isShowChecked, setIsShowChecked] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>();

  const hanldeImageUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], {
        type: file.type,
      });
      const formData = new FormData();
      formData.append("file", blob, file.name);

      handleOnChangeTopBannerItems("thumbnail", formData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <Row>
        <TitleForm>제목</TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="제목을 입력해주세요."
            onChange={(e: any) => {
              handleOnChangeTopBannerItems("title", e.target.value);
            }}
            value={topBannerItems.title}
          />
          {topBannerItems.title.length}/25
        </ContentsForm>
      </Row>
      <Row>
        <TitleForm>노출기간</TitleForm>
        <ContentsForm>
          <Row gap="24px">
            <Row gap="8px">
              <CheckBox
                type="checkbox"
                defaultChecked={topBannerItems.is_always_show === "Y"}
                onChange={() => {
                  handleOnChangeTopBannerItems(
                    "is_always_show",
                    topBannerItems.is_always_show === "Y" ? "N" : "Y"
                  );
                }}
              />{" "}
              상시
            </Row>
            <Row gap="8px">
              기간설정{" "}
              <Calendar
                type="date"
                min={dayjs().format("YYYY-MM-DDTHH:mm")}
                onChange={(e: any) => {
                  handleOnChangeTopBannerItems(
                    "show_started_at",
                    e.target.value
                  );
                }}
              />{" "}
              ~{" "}
              <Calendar
                type="date"
                min={dayjs().format("YYYY-MM-DDTHH:mm")}
                onChange={(e: any) => {
                  handleOnChangeTopBannerItems("show_ended_at", e.target.value);
                }}
              />
            </Row>
          </Row>
        </ContentsForm>
      </Row>
      <Row>
        <TitleForm>노출여부</TitleForm>
        <ContentsForm>
          <Row gap="24px">
            <Row gap="8px">
              <Radio
                type="radio"
                defaultChecked={topBannerItems.is_show === "Y"}
                onChange={() => {
                  handleOnChangeTopBannerItems("is_show", "Y");
                }}
              />
              노출
            </Row>
            <Row gap="8px">
              <Radio
                type="radio"
                defaultChecked={topBannerItems.is_show === "N"}
                onChange={() => {
                  handleOnChangeTopBannerItems("is_show", "N");
                }}
              />
              비노출
            </Row>
          </Row>
        </ContentsForm>
      </Row>
      <Row>
        <TitleForm>썸네일</TitleForm>
        <ContentsForm>
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
            (사이즈 : 1920x560px(px), 용량 2MB이하, 형식: jpg, png)
          </Row>
        </ContentsForm>
      </Row>
    </Container>
  );
};

export default CreateBannerItem;
