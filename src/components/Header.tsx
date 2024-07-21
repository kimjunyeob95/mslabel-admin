import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useHeaderHooks } from "./Header/hooks/useHeaderHooks";
import MainHeader from "./Header/MainHeader";
import SubHeader from "./Header/SubHeader";

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1920px;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 220px 0 50px;
  width: 100%;
  height: 145px;
  background: #414141;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 145px;
  left: 0;
  width: 245px;
  min-height: 100vh;
  background: #f9f9fc;
`;

const SubItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  width: 100%;
  height: 86px;

  border: 1px solid #d9d9d9;
  background: #f9f9fc;

  color: var(--Text-Gray_sub, #868686);
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.333px; /* 106.667% */
`;

const Header = () => {
  const location = useLocation();
  const { headerItem, visibleHeaderItem, handelOnClickHeaderItem } =
    useHeaderHooks();

  if (location.pathname === "/login") {
    return <></>;
  }

  return (
    <Container>
      {headerItem && (
        <React.Fragment>
          <MainContainer>
            <div>login</div>
            <MainHeader
              headerItem={headerItem}
              handelOnClickHeaderItem={handelOnClickHeaderItem}
            />
          </MainContainer>
          <SubHeader
            headerItem={headerItem}
            visibleHeaderItem={visibleHeaderItem}
          />
        </React.Fragment>
      )}
    </Container>
  );
};

export default Header;
