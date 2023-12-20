import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type ErrorStateType = {
  error: null | string;
};

const initialState: ErrorStateType = {
  error: null,
};

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

type ErrorSelectorType = (state: StateType) => ErrorStateType;

export const errorsSelector: ErrorSelectorType = (state) => state.error;

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
