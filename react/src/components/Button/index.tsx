import React from "react";

import * as S from "./styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <S.Container onClick={onClick} {...props}>
      {children}
    </S.Container>
  );
};

export default Button;
