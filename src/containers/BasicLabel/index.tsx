import React from "react";
import styled from "styled-components";

import CreateLabelItems from "./components/CreateLabelItems";
import Row from "../../components/Row";
import { useBasicLabelHooks } from "./hooks/useBasicLabelHooks";
import { parse } from "query-string-for-all";
import { useLocation, useParams } from "react-router-dom";
import BasicLabelList from "./components/BasicLabelList";

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

const BasicLabelPage = () => {
  const location = useLocation();
  const params = useParams<{ contents: string }>();
  const { content } = parse(location.search);

  console.log(params.contents, content);

  const {
    basicLabelParams,
    basicLabelList,
    handleChangeBasicLabelParams,
    handleCreateBasicLabel,
  } = useBasicLabelHooks();

  const renderContents = (): JSX.Element => {
    switch (params.contents) {
      case "create": {
        return (
          <CreateLabelItems
            basicLabelParams={basicLabelParams}
            handleChangeBasicLabelParams={handleChangeBasicLabelParams}
            handleCreateBasicLabel={handleCreateBasicLabel}
          />
        );
      }
      default: {
        return (
          <React.Fragment>
            {basicLabelList && (
              <BasicLabelList basicLabelList={basicLabelList} />
            )}
          </React.Fragment>
        );
      }
    }
  };

  return (
    <Container>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>일반라벨</Title>
      </Row>
      {renderContents()}
    </Container>
  );
};

export default BasicLabelPage;
