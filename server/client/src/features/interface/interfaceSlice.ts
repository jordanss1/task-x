import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type InterfaceStateType = {
  isFetching: boolean;
  progress: number;
  popup: boolean;
};

const initialState: InterfaceStateType = {
  isFetching: false,
  progress: 0,
  popup: false,
};

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.progress = 0;
        return;
      }

      if (action.payload === 100) {
        state.progress = 100;
        return;
      }

      state.progress += action.payload;
    },
    renderPopup: (state, action) => {
      state.popup = action.payload;
    },
  },
});

type InterfaceSelectorType = (state: StateType) => InterfaceStateType;

export const interfaceSelector: InterfaceSelectorType = (state) =>
  state.interface;

export const { setFetching, updateProgress } = interfaceSlice.actions;

export default interfaceSlice.reducer;
