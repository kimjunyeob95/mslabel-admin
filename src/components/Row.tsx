import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RowIProps {
  gap?: string;
  align?: string;
  justifyContent?: string;
  children: React.ReactNode;
}

const Row: React.FC<RowIProps> = (props) => {
  const { gap, align, justifyContent, children } = props;
  return (
    <Container
      style={{
        gap: gap && gap,
        alignItems: align && align,
        justifyContent: justifyContent && justifyContent,
      }}
    >
      {children}
    </Container>
  );
};

export default Row;
