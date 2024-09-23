import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Row from "../../../components/Row";
import { useMainMenuListHooks } from "../hooks/useMainMenuListHooks";
import Text from "../../../components/Text";
import {
  BoardType,
  useSubMenuRegistHooks,
} from "../hooks/useSubMenuRegistHooks";
import Column from "../../../components/Column";
import SaveButton from "../../Main/components/Common/SaveButton";

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

const RenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
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

const Radio = styled.input`
  width: 16px;
  height: 16px;
  stroke-width: 1px;
  stroke: var(--Line-Gray_2, #acacac);
  cursor: pointer;
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

const boardTypeList = [
  { text: "이미지", value: BoardType.IMAGE },
  { text: "상품", value: BoardType.PRODUCT },
  { text: "게시판", value: BoardType.BOARD },
  { text: "에디터", value: BoardType.EDITOR },
];

const CreateSubMenu = () => {
  const { mainMenuList } = useMainMenuListHooks();
  const { registParams, handleSetRegistParams, handleCreateSubMenu } =
    useSubMenuRegistHooks();
  const params = useParams<{ contents: string }>();

  const renderMenuForm = (): JSX.Element => {
    return (
      <ItemContainer>
        <TitleForm>
          대표 메뉴 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Row gap="24px">
            {mainMenuList?.map((item, idx) => {
              return (
                <Row gap="8px" key={idx}>
                  <Radio
                    type="radio"
                    checked={item.id === registParams.group_id}
                    value={registParams.group_id}
                    onChange={() => {
                      handleSetRegistParams("group_id", item.id);
                    }}
                  />
                  {item.title}
                </Row>
              );
            })}
          </Row>
        </ContentsForm>
      </ItemContainer>
    );
  };

  const renderSubMenuForm = (): JSX.Element => {
    return (
      <ItemContainer>
        <TitleForm>
          서브 메뉴 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <InputForm
            placeholder="메뉴명을 입력해주세요"
            value={registParams.title}
            onChange={(e) => {
              if (registParams.title.length < 25) {
                handleSetRegistParams("title", e.target.value);
              }
            }}
          />
          <Text color="#414141" size="16px" weight={400}>
            {registParams.title.length}/25
          </Text>
        </ContentsForm>
      </ItemContainer>
    );
  };

  const renderBoardType = (): JSX.Element => {
    return (
      <ItemContainer>
        <TitleForm>
          서브 메뉴 <span style={{ color: "#F00" }}>*</span>
        </TitleForm>
        <ContentsForm>
          <Row gap="24px">
            {boardTypeList.map((item, idx) => {
              return (
                <Row gap="8px" key={idx}>
                  <Radio
                    type="radio"
                    checked={item.value === registParams.type}
                    value={registParams.type}
                    onChange={() => {
                      handleSetRegistParams("type", item.value);
                    }}
                  />
                  {item.text}
                </Row>
              );
            })}
          </Row>
        </ContentsForm>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>서브 메뉴 설정</Title>
      </Row>
      <Column gap="40px" align="flex-end">
        <RenderContainer>
          {renderMenuForm()}
          {renderSubMenuForm()}
          {renderBoardType()}
        </RenderContainer>
        {params.contents === "create" ? (
          <SaveButton text="저장" onClick={handleCreateSubMenu} />
        ) : (
          <Row>
            <SaveButton
              text="삭제"
              onClick={handleCreateSubMenu}
              style={{ background: "#868686" }}
            />
            <SaveButton text="수정" onClick={handleCreateSubMenu} />
          </Row>
        )}
      </Column>
    </Container>
  );
};

export default CreateSubMenu;
