import styled from "styled-components";

export const Container = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 36px;
  font-size: 14px;
  width: 300px;
  padding: 0 8px;
  outline: none;

  &:active,
  &:focus {
    border: 1px solid #777;
  }
`;
