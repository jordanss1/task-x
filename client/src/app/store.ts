import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export type StateType = ReturnType<typeof store.getState>;
