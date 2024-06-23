import styled from "styled-components";
import Column from "../../components/Column";
import Row from "../../components/Row";
import Text from "../../components/Text";
import LoginInput from "./components/LoginInput";
import { useLoginHooks } from "./hooks/useLoginHooks";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1920px;
  min-height: 100vh;
  background-color: #eff5ff;
`;

const SubmitButton = styled.div`
  display: flex;
  width: 277px;
  padding: 23px 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #2550c0;
  cursor: pointer;
`;

const LoginPage = () => {
  const { onChangeLoginInformation, onSubmitLogin } = useLoginHooks();

  return (
    <Container>
      <Column gap="134px">
        <Text>명성라벨 관리자 페이지</Text>
        <Row gap="100px">
          <Row gap="24px">
            <Text size="20px">Admin ID</Text>
            <LoginInput
              id="id"
              placeholder="아이디를 입력하세요."
              onChange={onChangeLoginInformation}
            />
          </Row>
          <Row gap="24px">
            <Text size="20px">Admin PW</Text>
            <LoginInput
              id="password"
              placeholder="비밀번호를 입력하세요."
              onChange={onChangeLoginInformation}
            />
          </Row>
          <SubmitButton onClick={onSubmitLogin}>
            <Text color="#fff" size="16px">
              Login
            </Text>
          </SubmitButton>
        </Row>
        <Text size="16px" weight={400}>
          Copyright 2024 by 명성라벨. All rights reserved
        </Text>
      </Column>
    </Container>
  );
};

export default LoginPage;
