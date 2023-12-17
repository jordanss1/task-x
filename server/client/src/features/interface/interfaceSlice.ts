import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type InterfaceStateType = {
  isFetching: boolean;
  progress: number;
};

const initialState: InterfaceStateType = {
  isFetching: false,
  progress: 0,
};

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setFetching: (state) => {
      state.isFetching = !state.isFetching;
    },
    updateProgress: (state, action) => {
      if (!action.payload) {
        state.progress = 0;
        return;
      }

      if (action.payload === 100) {
        state.progress = 100;
        return;
      }

      state.progress += action.payload;
    },
  },
});

type InterfaceSelectorType = (state: StateType) => InterfaceStateType;

export const interfaceSelector: InterfaceSelectorType = (state) =>
  state.interface;

export const { setFetching, updateProgress } = interfaceSlice.actions;

export default interfaceSlice.reducer;
