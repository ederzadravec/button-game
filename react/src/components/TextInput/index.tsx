import React from "react";

import * as S from "./styled";

interface TextInputProps {
  onChange: (value?: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onChange }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <S.Container onChange={handleOnChange} />;
};

export default TextInput;
