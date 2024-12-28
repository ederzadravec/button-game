import React from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import * as GameTypes from "types/game";
import { useState } from "#/hooks";

const WS_URI = import.meta.env.VITE_WS_URI;
const socket = io(WS_URI);

interface GameProviderProps {
  children: any;
}

interface GameContextState {
  connected: boolean;
  user?: number;
  game?: GameTypes.Game;
}

interface GameContextValue {
  state?: GameContextState;
  createUser: (name: string) => void;
  createRoom: () => void;
  enterRoom: (room: string) => void;
  startGame: () => void;
  updateGame: (time: number) => void;
  endGame: () => void;
}

const GameContext = React.createContext<GameContextValue>({
  state: undefined,
  createUser: () => {},
  createRoom: () => {},
  enterRoom: () => {},
  startGame: () => {},
  updateGame: () => {},
  endGame: () => {},
});

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [state, setState] = useState<GameContextState>({
    connected: false,
    game: undefined,
  });

  const handleOnCreateUser: GameContextValue["createUser"] = async (name) => {
    socket.emit("createUser", name);
  };

  const handleOnCreateRoom: GameContextValue["createRoom"] = async () => {
    socket.emit("createRoom");
  };

  const handleOnEnterRoom: GameContextValue["enterRoom"] = async (room) => {
    socket.emit("enterRoom", room);
  };

  const handleOnStartGame: GameContextValue["startGame"] = async () => {
    socket.emit("startGame");
  };

  const handleOnUpdateGame: GameContextValue["updateGame"] = async (time) => {
    socket.emit("updateGame", time);
  };

  const handleOnEndGame = async () => {};

  const onCreatedUser = (data: { id: number }) => {
    setState({ user: data.id });
  };

  const onGameStatus = (game: GameTypes.Game) => {
    setState({ game });

    if (game.running) {
      navigate("/game");
    }
  };

  const onMessage = (data: GameTypes.Message) => {
    toast(data.message, {
      type: data.type,
    });
  };

  React.useEffect(() => {
    socket.on("connect", () => {
      setState({ connected: true });
    });

    socket.on("disconnect", () => {
      setState({ connected: false, game: undefined, user: undefined });
    });

    socket.on("createdUser", onCreatedUser);

    socket.on("gameStatus", onGameStatus);

    socket.on("message", onMessage);
  }, []);

  if (!state.connected) {
    return "Conectando ao servidor";
  }

  const value = {
    state,
    createUser: handleOnCreateUser,
    createRoom: handleOnCreateRoom,
    enterRoom: handleOnEnterRoom,
    startGame: handleOnStartGame,
    updateGame: handleOnUpdateGame,
    endGame: handleOnEndGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default {
  Provider: GameProvider,
  useGame: () => React.useContext(GameContext),
};
