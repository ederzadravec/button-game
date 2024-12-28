import React from "react";

type StateReturn<State> = [
  State,
  <T extends Partial<State>>(
    newState?: T | ((prevState?: State) => State)
  ) => void
];

const useState = <State,>(initialState?: State): StateReturn<State> => {
  const [state, setUseState] = React.useState<State | undefined>(initialState);

  const setState = <T extends Partial<State>>(
    newState?: T | ((prevState?: State) => State)
  ) => {
    //  @ts-ignore
    if (typeof newState == "function") return setUseState(newState);

    return setUseState((prev?: any) => {
      if (Array.isArray(prev) && Array.isArray(newState)) {
        return [...prev, ...newState];
      }

      if (typeof newState === "object" && typeof prev === "object") {
        return { ...prev, ...newState };
      }

      return newState;
    });
  };

  return [state as State, setState];
};

export default useState;
