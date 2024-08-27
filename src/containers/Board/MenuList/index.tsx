import React from "react";
import styled from "styled-components";

import Row from "../../../components/Row";
import CommonTable from "../../../components/Table";
import { useMainMenuListHooks } from "../hooks/useMainMenuListHooks";

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

const MainMenuList = () => {
  const { mainMenuList } = useMainMenuListHooks();

  return (
    <React.Fragment>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>대표 메뉴 설정</Title>
      </Row>
      <CommonTable
        thElement={
          <React.Fragment>
            <th>선택</th>
            <th>제목</th>
            <th>서브 메뉴 수</th>
          </React.Fragment>
        }
        tdElement={
          <React.Fragment>
            {mainMenuList!.map((item, idx) => {
              return (
                <tr className="item" key={idx}>
                  <td style={{ padding: "10px" }}>
                    <CheckBox type="checkbox" />
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                      width: "880px",
                    }}
                  >
                    <TitleContainer>{item.title}</TitleContainer>
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      width: "230px",
                    }}
                  >
                    {item.sub_menus.length}
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

export default MainMenuList;
