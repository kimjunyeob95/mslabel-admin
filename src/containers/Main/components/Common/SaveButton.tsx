import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 56px;
  background: var(--Accent-Blue_main, #3870aa);

  color: #fff;

  /* Content txt */
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */

  cursor: pointer;
`;

interface SaveButtonIProps {
  onClick: any;
  text: string;
  style?: React.CSSProperties;
}

const SaveButton: React.FC<SaveButtonIProps> = (props) => {
  const { onClick, text, style } = props;
  return (
    <Container onClick={onClick} style={{ ...style }}>
      {text}
    </Container>
  );
};

export default SaveButton;
