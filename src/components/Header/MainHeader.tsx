import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MAIN_LOGO } from "../../assets/image";
import { HeaderItem } from "../../utils/types/HeaderTypes";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 78px;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 155px;
  margin-right: 45px;
`;

const MenuBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 28px 40px;
  background-color: ${(props) => (props.$isSelected ? "#fff" : "#414141")};
  color: ${(props) => (props.$isSelected ? "#414141" : "#fff")};
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 21.333px; /* 118.519% */
  cursor: pointer;
`;

interface MainHeaderIProps {
  headerItem: HeaderItem[];
  handelOnClickHeaderItem: (headerContents: string) => void;
}

const MainHeader: React.FC<MainHeaderIProps> = (props) => {
  const { headerItem, handelOnClickHeaderItem } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [selecteItem, setSelectedItem] = useState<string>("게시판관리");

  useEffect(() => {
    if (location.pathname.includes("main")) {
      handelOnClickHeaderItem("메인");
      setSelectedItem("메인");

      return;
    }

    if (location.pathname.includes("basic")) {
      handelOnClickHeaderItem("일반라벨");
      setSelectedItem("일반라벨");

      return;
    }

    if (location.pathname.includes("digital")) {
      handelOnClickHeaderItem("디지털인쇄");
      setSelectedItem("디지털인쇄");

      return;
    }

    if (location.pathname.includes("estimate")) {
      handelOnClickHeaderItem("견적문의");
      setSelectedItem("견적문의");

      return;
    }
  }, [location]);

  return (
    <Container>
      <Logo src={MAIN_LOGO} alt="main logo" />
      <MenuBox
        $isSelected={selecteItem === "게시판관리"}
        onClick={() => {
          handelOnClickHeaderItem("게시판관리");
          setSelectedItem("게시판관리");
          navigate("/board/menu?content=view");
        }}
      >
        게시판관리
      </MenuBox>
      <MenuBox
        $isSelected={selecteItem === "메인"}
        onClick={() => {
          handelOnClickHeaderItem("메인");
          setSelectedItem("메인");
          navigate("/main/banner?content=view");
        }}
      >
        메인
      </MenuBox>
      {headerItem.map((item, idx) => {
        return (
          <MenuBox
            key={idx}
            $isSelected={selecteItem === item.title}
            onClick={() => {
              handelOnClickHeaderItem(item.title);
              setSelectedItem(item.title);

              switch (item.id) {
                case 3: {
                  navigate(
                    `/label/basic?group_id=${item.id}&sub_id=${
                      headerItem[2].sub_menus![0].id
                    }`
                  );

                  return;
                }
                case 4: {
                  navigate(
                    `/label/digital?group_id=${item.id}&sub_id=${
                      headerItem[3].sub_menus![0].id
                    }`
                  );

                  return;
                }
                case 5: {
                  navigate(
                    `/estimate?group_id=${item.id}&sub_id=${
                      headerItem[4].sub_menus![0].id
                    }`
                  );

                  return;
                }
              }
            }}
          >
            {item.title}
          </MenuBox>
        );
      })}
      {/* <MenuBox
        $isSelected={selecteItem === "회원관리"}
        onClick={() => {
          handelOnClickHeaderItem("회원관리");
          setSelectedItem("회원관리");
        }}
      >
        회원관리
      </MenuBox>
      <MenuBox
        $isSelected={selecteItem === "시스템관리"}
        onClick={() => {
          handelOnClickHeaderItem("시스템관리");
          setSelectedItem("시스템관리");
        }}
      >
        시스템관리
      </MenuBox>
      <MenuBox
        $isSelected={selecteItem === "기타"}
        onClick={() => {
          handelOnClickHeaderItem("기타");
          setSelectedItem("기타");
        }}
      >
        기타
      </MenuBox> */}
    </Container>
  );
};

export default MainHeader;
