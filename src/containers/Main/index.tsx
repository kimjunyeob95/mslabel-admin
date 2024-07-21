import { useParams } from "react-router-dom";
import styled from "styled-components";
import Column from "../../components/Column";
import Row from "../../components/Row";
import CommonTable from "../../components/Table";
import CreateBannerItem from "./components/CreateBannerItem";
import TopBanner from "./components/TopBanner/TopBanner";

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

const Title = styled.div`
  color: #000;
  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px; /* 131.25% */
`;

const MainPage = () => {
  const params = useParams<{ contents: string }>();

  const renderMainPageContents = (): JSX.Element => {
    switch (params.contents) {
      case "banner":
        return <TopBanner />;
      default:
        return <></>;
    }
  };

  return <Container>{renderMainPageContents()}</Container>;
};

export default MainPage;
