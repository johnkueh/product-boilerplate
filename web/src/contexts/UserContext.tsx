import React from "react";

export interface UserState {
  id?: string;
  email?: string;
  name?: string;
}

export interface InitialState {
  user?: UserState | null;
  setUser?: (user?: UserState | null) => void;
}

export const initialState: InitialState = {
  user: undefined,
  setUser: () => {}
};

export default React.createContext(initialState);
