import React from "react";

import { Button, TextInput } from "#/components";
import { GameContext } from "#/contexts";
import { useState } from "#/hooks";

import * as S from "./styled";

const UserForm: React.FC = () => {
  const { createUser } = GameContext.useGame();
  const [name, setName] = useState<string>("");

  const handleOnRegister = async () => {
    createUser(name);
  };

  return (
    <>
      <S.Title>Qual seu nome?</S.Title>

      <TextInput onChange={setName} />

      <Button onClick={handleOnRegister} disabled={!name}>
        Avançar
      </Button>
    </>
  );
};

export default UserForm;
