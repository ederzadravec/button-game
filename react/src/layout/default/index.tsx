import React from "react";
import { Outlet } from "react-router-dom";

import * as S from "./styled";

const Default: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default Default;
