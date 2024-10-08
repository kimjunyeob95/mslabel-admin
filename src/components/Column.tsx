import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface ColumnIProps {
  gap?: string;
  align?: string;
  justifyContent?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Column: React.FC<ColumnIProps> = (props) => {
  const { gap, align, justifyContent, style, children } = props;

  return (
    <Container
      style={{
        gap: gap && gap,
        alignItems: align && align,
        justifyContent: justifyContent && justifyContent,
        ...style,
      }}
    >
      {children}
    </Container>
  );
};

export default Column;
