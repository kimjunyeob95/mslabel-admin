import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import TopBanner from "../Main/components/TopBanner/TopBanner";
import Introduce from "../Main/components/Introduce/Introduce";
import MainMenuList from "./MenuList";
import SubMenuList from "./SubMenuList";

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

const BoardPage = () => {
  const params = useParams<{ contents: string }>();

  const renderMainPageContents = (): JSX.Element => {
    switch (params.contents) {
      case "menu":
        return <MainMenuList />;
      case "subMenu":
        return <SubMenuList />;
      default:
        return <></>;
    }
  };

  return <Container>{renderMainPageContents()}</Container>;
};

export default BoardPage;
