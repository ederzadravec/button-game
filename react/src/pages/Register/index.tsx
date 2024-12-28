import React from "react";

import { GameContext } from "#/contexts";

import RoomForm from "./components/RoomForm";
import UserForm from "./components/UserForm";
import WaitingGame from "./components/WaitingGame";
import * as S from "./styled";

const User: React.FC = () => {
  const { state } = GameContext.useGame();

  const Component = React.useMemo(() => {
    if (state?.game?.room) return WaitingGame;

    if (state?.user) return RoomForm;

    return UserForm;
  }, [state]);

  return (
    <S.Container>
      <Component />
    </S.Container>
  );
};

export default User;
