import styled from "styled-components";
import CommonTable from "../../components/Table";
import { useMainPageHooks } from "./hooks/useMainPageHooks";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  border: 1px solid red;
`;

const MainPage = () => {
  const { test } = useMainPageHooks();

  return (
    <Container>
      <CommonTable />
    </Container>
  );
};

export default MainPage;
