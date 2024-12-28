import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "#/layout/default";
import RegisterPage from "#/pages/Register";
import GamePage from "#/pages/Game";
import { GameContext } from "#/contexts";

const RoutesComp: React.FC = () => {
  return (
    <BrowserRouter>
      <GameContext.Provider>
        <Routes>
          <Route path="/*" element={<Default />}>
            <Route index element={<RegisterPage />} />
            <Route path="game" element={<GamePage />} />
          </Route>
        </Routes>
      </GameContext.Provider>
    </BrowserRouter>
  );
};

export default RoutesComp;
