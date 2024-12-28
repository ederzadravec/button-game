import React from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "#/contexts";

import ButtonGame from "./components/ButtonGame";
import Players from "./components/Players";
import * as S from "./styled";

const User: React.FC = () => {
  const navigate = useNavigate();
  const { state } = GameContext.useGame();

  React.useEffect(() => {
    if (!state?.game?.running) navigate("/");
  }, [state]);

  return (
    <S.Container>
      <S.Content>
        <Players />

        <ButtonGame />
      </S.Content>
    </S.Container>
  );
};

export default User;
