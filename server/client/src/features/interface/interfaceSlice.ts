import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type InterfaceStateType = {
  isFetching: boolean;
  progress: number | null;
};

const initialState: InterfaceStateType = {
  isFetching: false,
  progress: null,
};

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setFetching: (state) => {
      state.isFetching = !state.isFetching;
    },
    updateProgress: (state, action) => {
      state.progress += action.payload;
    },
  },
});

type InterfaceSelectorType = (state: StateType) => InterfaceStateType;

const interfaceSelector: InterfaceSelectorType = (state) => state.interface;

export const { setFetching, updateProgress } = interfaceSlice.actions;

export default interfaceSlice.reducer;
