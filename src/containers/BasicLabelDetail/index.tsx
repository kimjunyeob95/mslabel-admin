import React from "react";
import styled from "styled-components";
import Row from "../../components/Row";
import { useBasicLabelDetailHooks } from "./hooks/useBasicLabelDetailHooks";

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

const BasicLabelDetailPage = () => {
  const {} = useBasicLabelDetailHooks();

  return (
    <Container>
      <Row style={{ width: "100%", justifyContent: "flex-start" }}>
        <Title>일반라벨</Title>
      </Row>
    </Container>
  );
};

export default BasicLabelDetailPage;
