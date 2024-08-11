import { useParams } from "react-router-dom";
import styled from "styled-components";
import Introduce from "./components/Introduce/Introduce";

import TopBanner from "./components/TopBanner/TopBanner";
import Introduce2Page from "./components/Introduce2/Introduce2";

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

const MainPage = () => {
  const params = useParams<{ contents: string }>();

  const renderMainPageContents = (): JSX.Element => {
    switch (params.contents) {
      case "banner":
        return <TopBanner />;
      case "introduce":
        return <Introduce />;
      case "subIntro":
        return <Introduce2Page />;
      default:
        return <></>;
    }
  };

  return <Container>{renderMainPageContents()}</Container>;
};

export default MainPage;
