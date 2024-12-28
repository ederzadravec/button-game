import styled from "styled-components";

export const Container = styled.button`
  border: 1px solid #ccc;
  border-radius: 10px;
  min-width: 100px;
  width: max-content;
  padding: 0 12px;
  height: 36px;
  cursor: pointer;
  transition: 0.4s ease;
  font-size: 14px;

  &:hover {
    font-size: 15px;
    border: 1px solid #777;
  }
`;
