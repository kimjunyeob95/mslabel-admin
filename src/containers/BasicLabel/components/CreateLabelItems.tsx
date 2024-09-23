import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string-for-all";
import styled from "styled-components";
import Row from "../../../components/Row";
import Column from "../../../components/Column";
import { BasicLabelParams } from "../hooks/useBasicLabelHooks";
import SaveButton from "../../Main/components/Common/SaveButton";
import { useSubMenuListHooks } from "../../Board/hooks/useSubMenuListHooks";

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
  cursor: pointer;
`;

const Textarea = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 25px;
  width: 700px;
  height: 230px;
  border: 1px solid var(--Line-Gray, #d9d9d9);

  ::placeholder {
    text-align: center;
    color: var(--Text-Main, #414141);

    font-family: "Spoqa Han Sans Neo";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;

const ThumbnailImage = styled.img`
  width: 106px;
  height: 106px;
`;
interface CreateLabelItemsIProps {
  basicLabelParams: BasicLabelParams;
  type: "create" | "update";
  handleChangeBasicLabelParams: (key: string, value: any) => void;
  handleCreateBasicLabel: () => void;
  handleDeleteBasicLabel: () => void;
}

const CreateLabelItems: React.FC<CreateLabelItemsIProps> = (props) => {
  const {
    basicLabelParams,
    type,
    handleChangeBasicLabelParams,
    handleCreateBasicLabel,
    handleDeleteBasicLabel,
  } = props;

  const location = useLocation();

  const { group_id } = parse(location.search);

  const { basicLabelSubMenuList, getSubBasicLabelList } = useSubMenuListHooks();

  const hanldeImageUpload = (key: string, event: any) => {
    const file = event.target.files[0];

    handleChangeBasicLabelParams(key, file);
  };

  useEffect(() => {
    if (group_id) {
      getSubBasicLabelList(group_id ? Number(group_id) : 0);
    }
  }, [group_id]);

  const renderSaveButton = (): JSX.Element => {
    if (type === "create") {
      return (
        <Row
          justifyContent="flex-end"
          style={{ width: "100%", paddingTop: "50px" }}
        >
          <SaveButton
            onClick={() => {
              handleCreateBasicLabel();
            }}
            text="저장"
          />
        </Row>
      );
    }

    return (
      <Row
        justifyContent="flex-end"
        gap="14px"
        style={{ width: "100%", paddingTop: "50px" }}
      >
        <SaveButton
          onClick={() => {
            handleDeleteBasicLabel();
          }}
          text="삭제"
          style={{ background: "#868686" }}
        />
        <SaveButton
          onClick={() => {
            handleCreateBasicLabel();
          }}
          text="수정"
        />
      </Row>
    );
  };

  return (
    <Container>
      <ItemContainer>
        <TitleForm>
          서브 메뉴 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Row gap="24px">
            {basicLabelSubMenuList &&
              basicLabelSubMenuList?.result.map((item, idx) => {
                return (
                  <Row gap="8px" key={idx}>
                    <Radio
                      type="radio"
                      checked={basicLabelParams.sub_id === item.id}
                      onChange={() => {
                        handleChangeBasicLabelParams("sub_id", item.id);
                      }}
                    />
                    {item.sub_title}
                  </Row>
                );
              })}
          </Row>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          제목 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="제목을 입력해주세요."
            value={basicLabelParams.title}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("title", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          노출여부 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Row gap="24px">
            <Row gap="8px">
              <Radio
                type="radio"
                checked={basicLabelParams.is_show === "Y"}
                onChange={() => {
                  handleChangeBasicLabelParams("is_show", "Y");
                }}
              />
              노출
            </Row>
            <Row gap="8px">
              <Radio
                type="radio"
                checked={basicLabelParams.is_show === "N"}
                onChange={() => {
                  handleChangeBasicLabelParams("is_show", "N");
                }}
              />
              비노출
            </Row>
          </Row>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          내용 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Textarea
            placeholder="내용을 입력하세요."
            value={basicLabelParams.desc}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("desc", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          대표 이미지 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
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
                onChange={(e) => hanldeImageUpload("main_img", e)}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
            {type === "update" && (
              <ThumbnailImage
                src={basicLabelParams.main_img}
                alt="main thumbnail"
              />
            )}
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          하단 이미지1 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file-bottom">
                파일선택
              </label>
              <input
                type="file"
                id="input-file-bottom"
                style={{ display: "none" }}
                onChange={(e: any) => {
                  const file = e.target.files[0];

                  handleChangeBasicLabelParams("bottom_img1", file);
                }}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
            {type === "update" && (
              <ThumbnailImage
                src={basicLabelParams.bottom_img1}
                alt="bottom thumbnail"
              />
            )}
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>하단 이미지2</TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file-bottom2">
                파일선택
              </label>
              <input
                type="file"
                id="input-file-bottom2"
                style={{ display: "none" }}
                onChange={(e) => hanldeImageUpload("bottom_img2", e)}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>하단 이미지3</TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file-bottom3">
                파일선택
              </label>
              <input
                type="file"
                id="input-file-bottom3"
                style={{ display: "none" }}
                onChange={(e) => hanldeImageUpload("bottom_img3", e)}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>하단 이미지4</TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file-bottom4">
                파일선택
              </label>
              <input
                type="file"
                id="input-file-bottom4"
                style={{ display: "none" }}
                onChange={(e) => hanldeImageUpload("bottom_img4", e)}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>하단 이미지5</TitleForm>
        <ContentsForm>
          <Column gap="13px" align="flex-start">
            <Row gap="24px">
              <label className="input-file-button" htmlFor="input-file-bottom5">
                파일선택
              </label>
              <input
                type="file"
                id="input-file-bottom5"
                style={{ display: "none" }}
                onChange={(e) => hanldeImageUpload("bottom_img5", e)}
              />
              (사이즈 : 606x606(px), 용량 5MB이하, 형식: jpg, png)
            </Row>
          </Column>
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          원단 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="원단을 입력하세요."
            value={basicLabelParams.material}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("material", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          사이즈 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="사이즈를 입력하세요."
            value={basicLabelParams.size}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("size", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          형태 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="형태를 입력하세요."
            value={basicLabelParams.shape}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("shape", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      <ItemContainer>
        <TitleForm>
          키워드 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="#000, #000와 같이 키워드를 입력하세요."
            value={basicLabelParams.keywords}
            onChange={(e: any) => {
              handleChangeBasicLabelParams("keywords", e.target.value);
            }}
          />
        </ContentsForm>
      </ItemContainer>
      {renderSaveButton()}
    </Container>
  );
};

export default CreateLabelItems;
