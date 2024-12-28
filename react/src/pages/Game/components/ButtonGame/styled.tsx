import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button<{ disabled: boolean }>`
  width: 200px;
  height: 100px;
  border-radius: 20px;
  font-weight: bold;

  background: ${({ disabled, theme }) =>
    !disabled ? theme.palette.success.main : theme.palette.error.main}aa;
  border: 1px solid;
  border-color: ${({ disabled, theme }) =>
    !disabled ? theme.palette.success.main : theme.palette.error.main};
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
`;

export const Wait = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
