import React from "react";
import { differenceInMilliseconds } from "date-fns";

import { GameContext } from "#/contexts";

import * as S from "./styled";

const ButtonGame: React.FC = () => {
  const { state, updateGame } = GameContext.useGame();
  const [button, setButton] = React.useState<{ active: boolean; date?: Date }>({
    active: false,
  });

  const showButton = React.useMemo(
    () => state?.game?.currentUser === state?.user,
    [state]
  );

  const handleOnClick = () => {
    const time = differenceInMilliseconds(new Date(), button!.date!);

    updateGame(time);

    setButton({ active: false, date: undefined });
  };

  React.useEffect(() => {
    if (!showButton) return;

    const ramdomTimeout = Math.floor(Math.random() * 2000);

    setTimeout(() => {
      setButton({ active: true, date: new Date() });
    }, ramdomTimeout);
  }, [showButton]);

  return (
    <S.Container>
      {showButton ? (
        <S.Button disabled={!button.active} onClick={handleOnClick}>
          Clique Aqui
        </S.Button>
      ) : (
        <S.Wait>Aguarde sua vez</S.Wait>
      )}
    </S.Container>
  );
};

export default ButtonGame;
