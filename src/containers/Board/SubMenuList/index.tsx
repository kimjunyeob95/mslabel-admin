import React, { useState } from "react";
import styled from "styled-components";
import Row from "../../../components/Row";
import { useSubMenuListHooks } from "../hooks/useSubMenuListHooks";
import CommonTable from "../../../components/Table";
import Pagination from "../../../components/Pagination/Pagination";
import SaveButton from "../../Main/components/Common/SaveButton";
import { useNavigate } from "react-router-dom";

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
  const { subMenuList, handleSetSubmenuParams } = useSubMenuListHooks();
  const navigate = useNavigate();

  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const pagiNationLength = subMenuList
    ? Math.ceil(subMenuList!.total_records / 10)
    : 0;

  const handlePaginationNavigate = (type: string) => {
    switch (type) {
      case "next": {
        if (paginationIndex !== pagiNationLength) {
          setPaginationIndex(paginationIndex + 1);
          handleSetSubmenuParams("page", paginationIndex + 1);
        }

        return;
      }
      case "next-all": {
        if (paginationIndex !== pagiNationLength) {
          setPaginationIndex(pagiNationLength);
          handleSetSubmenuParams("page", pagiNationLength);
        }
        return;
      }
      case "prev": {
        if (paginationIndex !== 1) {
          setPaginationIndex(paginationIndex - 1);
          handleSetSubmenuParams("page", paginationIndex - 1);
        }

        return;
      }
      case "prev-all": {
        if (paginationIndex !== 1) {
          setPaginationIndex(1);
          handleSetSubmenuParams("page", 1);
        }
        return;
      }
      default:
        return;
    }
  };

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
      <Row
        align="flex-start"
        justifyContent="space-between"
        style={{ width: "100%", padding: "0 40px" }}
      >
        <SaveButton
          onClick={() => {}}
          text="서브 메뉴 추가"
          style={{
            border: "1px solid #d9d9d9",
            background: "#f9f9fc",
            color: "#414141",
          }}
        />
        <Pagination
          paginationIndex={paginationIndex}
          paginationLength={pagiNationLength}
          setPaginationIndex={setPaginationIndex}
          handleFilter={handleSetSubmenuParams}
          handlePaginationNavigate={handlePaginationNavigate}
        />
        <SaveButton
          onClick={() => {
            navigate("/board/subMenu/create");
          }}
          text="서브 메뉴 추가"
          style={{
            border: "1px solid #d9d9d9",
            background: "#f9f9fc",
            color: "#414141",
          }}
        />
      </Row>
    </React.Fragment>
  );
};

export default SubMenuList;
