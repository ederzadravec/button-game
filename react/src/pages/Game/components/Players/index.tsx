import React from "react";

import { GameContext } from "#/contexts";

import * as S from "./styled";

const Players: React.FC = () => {
  const { state } = GameContext.useGame();

  const activeUsers = React.useMemo(() => {
    return state?.game?.users?.filter((item) =>
      state.game?.activeUsers?.includes?.(item.id)
    );
  }, [state]);

  const inactiveUsers = React.useMemo(() => {
    return state?.game?.users?.filter(
      (item) => !state.game?.activeUsers?.includes?.(item.id)
    );
  }, [state]);

  return (
    <S.Container>
      <S.Title>Jogadores Ativos</S.Title>

      <S.Players>
        {activeUsers?.map((item) => (
          <S.Player active={item.id === state?.game?.currentUser}>
            {item.name} - {item.time || 0}
          </S.Player>
        ))}
      </S.Players>

      {!inactiveUsers?.length ? null : (
        <>
          <S.Title>Eliminados</S.Title>

          <S.Players>
            {inactiveUsers?.map((item) => (
              <S.Player active={false}>{item.name}</S.Player>
            ))}
          </S.Players>
        </>
      )}
    </S.Container>
  );
};

export default Players;
