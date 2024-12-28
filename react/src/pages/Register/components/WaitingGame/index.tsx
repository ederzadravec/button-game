import React from "react";

import { Button } from "#/components";
import { GameContext } from "#/contexts";

import * as S from "./styled";

const UserForm: React.FC = () => {
  const { state, startGame } = GameContext.useGame();

  const handleOnStart = async () => {
    startGame();
  };

  const users = state?.game?.users?.length || 0;
  const room = state?.game?.room;

  return (
    <>
      <S.Title>Aguardando outros jogadores - Sala {room}</S.Title>

      <S.Legend>{users} na sala</S.Legend>

      <Button onClick={handleOnStart}>Iniciar</Button>
    </>
  );
};

export default UserForm;
