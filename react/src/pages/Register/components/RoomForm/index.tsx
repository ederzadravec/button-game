import React from "react";

import { Button, TextInput } from "#/components";
import { GameContext } from "#/contexts";
import { useState } from "#/hooks";

import * as S from "./styled";

const UserForm: React.FC = () => {
  const { createRoom, enterRoom } = GameContext.useGame();
  const [room, setRoom] = useState<string>("");

  const handleOnRegister = async () => {
    createRoom();
  };

  const handleOnEnter = async () => {
    enterRoom(room);
  };

  return (
    <>
      <S.Title>Em qual sala deseja jogar?</S.Title>

      <TextInput onChange={setRoom} />

      <Button onClick={handleOnEnter} disabled={!room}>
        Avançar
      </Button>

      <Button onClick={handleOnRegister}>Criar nova sala</Button>
    </>
  );
};

export default UserForm;
