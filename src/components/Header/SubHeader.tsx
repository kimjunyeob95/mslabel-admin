import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HeaderItem } from "../../utils/types/HeaderTypes";

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 145px;
  left: 0;
  width: 245px;
  min-height: 100vh;
  height: 100%;
  background: #f9f9fc;
`;

const SubItem = styled.div<{ $isActiveButton: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  height: 86px;

  border: 1px solid #d9d9d9;
  background: ${(props) => (props.$isActiveButton ? "#3870AA" : "#f9f9fc")};

  color: ${(props) => (props.$isActiveButton ? "#fff" : "#868686")};
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.333px; /* 106.667% */
  cursor: pointer;
`;

interface SubHeaderIProps {
  headerItem: HeaderItem[];
  visibleHeaderItem: string;
}

const SubHeader: React.FC<SubHeaderIProps> = (props) => {
  const { headerItem, visibleHeaderItem } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const renderHeaderContents = () => {
    switch (visibleHeaderItem) {
      case "게시판관리": {
        return (
          <>
            <SubItem $isActiveButton={false}>최근 게시물_고객</SubItem>
            <SubItem $isActiveButton={false}>최근 게시물_관리자</SubItem>
            <SubItem
              $isActiveButton={location.pathname.includes("/menu")}
              onClick={() => navigate("/board/menu?content=view")}
            >
              대표 메뉴 설정
            </SubItem>
            <SubItem
              $isActiveButton={location.pathname.includes("/subMenu")}
              onClick={() => navigate("/board/subMenu?content=view")}
            >
              서브 메뉴 설정
            </SubItem>
          </>
        );
      }
      case "메인": {
        return (
          <>
            <SubItem
              $isActiveButton={location.pathname.includes("/banner")}
              onClick={() => navigate("/main/banner?content=view")}
            >
              상단 배너
            </SubItem>
            <SubItem
              $isActiveButton={location.pathname.includes("/introduce")}
              onClick={() => navigate("/main/introduce?content=view")}
            >
              소개
            </SubItem>
            {/* <SubItem
              $isActiveButton={false}
              onClick={() => navigate("/main/banner")}
            >
              라벨종류
            </SubItem> */}
            <SubItem
              $isActiveButton={location.pathname.includes("/subIntro")}
              onClick={() => navigate("/main/subIntro?content=view")}
            >
              소개2
            </SubItem>
          </>
        );
      }
      case "회사 소개": {
        return (
          <>
            {headerItem[0].sub_menus?.map((item, idx) => {
              return (
                <SubItem $isActiveButton={false} key={idx}>
                  {item.title}
                </SubItem>
              );
            })}
          </>
        );
      }
      case "사업소개": {
        return (
          <>
            {headerItem[1].sub_menus?.map((item, idx) => {
              return (
                <SubItem $isActiveButton={false} key={idx}>
                  {item.title}
                </SubItem>
              );
            })}
          </>
        );
      }
      case "일반라벨": {
        return (
          <>
            {/* <SubItem
              $isActiveButton={
                location.pathname.includes(`label/basic`) ||
                location.pathname.includes("basicLabel/detail") ||
                location.pathname.includes(`basicLabel/create`)
              }
              onClick={() => {
                navigate(`/label/basic?group_id=${headerItem[2].id}`);
              }}
            >
              전체 게시물
            </SubItem> */}
            {headerItem[2].sub_menus?.map((item, idx) => {
              return (
                <SubItem
                  $isActiveButton={location.search.includes(
                    `sub_id=${item.id}`
                  )}
                  key={idx}
                  onClick={() => {
                    navigate(
                      `/label/basic?group_id=${headerItem[2].id}&sub_id=${item.id}`
                    );
                  }}
                >
                  {item.title}
                </SubItem>
              );
            })}
          </>
        );
      }
      case "디지털인쇄": {
        return (
          <>
            {headerItem[3].sub_menus?.map((item, idx) => {
              return (
                <SubItem
                  $isActiveButton={location.search.includes(
                    `sub_id=${item.id}`
                  )}
                  key={idx}
                  onClick={() => {
                    navigate(
                      `/label/digital?group_id=${headerItem[3].id}&sub_id=${item.id}`
                    );
                  }}
                >
                  {item.title}
                </SubItem>
              );
            })}
          </>
        );
      }
      case "견적문의": {
        return (
          <>
            {headerItem[4].sub_menus?.map((item, idx) => {
              return (
                <SubItem $isActiveButton={false} key={idx}>
                  {item.title}
                </SubItem>
              );
            })}
          </>
        );
      }
      default:
        return;
    }
  };

  return (
    <SubContainer>
      <SubItem
        $isActiveButton={false}
        style={{ background: "#fff", border: "none" }}
      />
      {renderHeaderContents()}
    </SubContainer>
  );
};

export default SubHeader;
