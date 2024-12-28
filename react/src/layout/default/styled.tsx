import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #eee;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  min-height: 200px;
  max-height: 600px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 5px #ddd;
  padding: 12px;
`;
