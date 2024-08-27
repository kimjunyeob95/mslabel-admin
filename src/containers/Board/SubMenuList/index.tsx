import React from "react";
import styled from "styled-components";
import Row from "../../../components/Row";
import { useSubMenuListHooks } from "../hooks/useSubMenuListHooks";
import CommonTable from "../../../components/Table";

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #acacac;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 25px;
  width: 710px;

  border: 1px solid var(--Line-Gray, #d9d9d9);
  background: var(--Background-Skyblue, #eff5ff);

  color: var(--Text-Main, #414141);

  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const menuType: any = {
  board: "게시판",
  image: "이미지",
  product: "상품",
  editor: "에디터",
};

const SubMenuList = () => {
  const { subMenuList } = useSubMenuListHooks();

  return (
    <React.Fragment>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>서브 메뉴 설정</Title>
      </Row>
      <CommonTable
        thElement={
          <React.Fragment>
            <th>선택</th>
            <th>순서</th>
            <th>대표 메뉴</th>
            <th>서브 메뉴</th>
            <th>유형</th>
          </React.Fragment>
        }
        tdElement={
          <React.Fragment>
            {subMenuList?.result?.map((item, idx) => {
              return (
                <tr className="item" key={idx}>
                  <td>
                    <CheckBox type="checkbox" />
                  </td>
                  <td>
                    <TitleContainer style={{ width: "90px" }}>
                      {item.id}
                    </TitleContainer>
                  </td>
                  <td
                    style={{
                      width: "220px",
                    }}
                  >
                    {item.main_title}
                  </td>
                  <td>
                    <TitleContainer style={{ justifyContent: "flex-start" }}>
                      {item.sub_title}
                    </TitleContainer>
                  </td>
                  <td
                    style={{
                      width: "220px",
                    }}
                  >
                    {menuType[item.type]}
                  </td>
                </tr>
              );
            })}
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default SubMenuList;
