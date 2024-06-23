import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 277px;
  padding: 23px 36px;
  border-radius: 16px;
  background: #fff;
  border: none;
`;

interface LoginInputIProps {
  id: string;
  placeholder: string;
  onChange: (id: string, value: string) => void;
}

const LoginInput: React.FC<LoginInputIProps> = (props) => {
  const { id, placeholder, onChange } = props;

  const [value, setValue] = useState<string>("");

  return (
    <Input
      id={id}
      type={id}
      placeholder={placeholder}
      value={value}
      onChange={(event: any) => {
        setValue(event.target.value);
        onChange(id, event.target.value);
      }}
    />
  );
};

export default LoginInput;
