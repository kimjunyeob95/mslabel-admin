import styled from "styled-components";

const TextItem = styled.div`
  color: #414141;
  text-align: center;

  font-family: "Spoqa Han Sans Neo";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px; /* 131.25% */
`;

interface TextIProps {
  color?: string;
  size?: string;
  weight?: number;
  children: React.ReactNode;
}

const Text: React.FC<TextIProps> = (props) => {
  const { color, size, weight, children } = props;

  return (
    <TextItem
      style={{
        color: color && color,
        fontSize: size && size,
        fontWeight: weight && weight,
      }}
    >
      {children}
    </TextItem>
  );
};

export default Text;
