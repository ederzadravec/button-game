import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  border-right: 1px solid #ccc;
`;

export const Title = styled.span`
  margin-top: 12px;
  font-size: 14px;
`;

export const Players = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

export const Player = styled.span<{ active: boolean }>`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;
