import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type NotificationStateType = {
  error: null | string;
  success: null | string;
};

const initialState: NotificationStateType = {
  error: null,
  success: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
  },
});

type NotificationSelectorType = (state: StateType) => NotificationStateType;

export const notificationSelector: NotificationSelectorType = (state) =>
  state.notification;

export const { setError, setSuccess } = notificationSlice.actions;

export default notificationSlice.reducer;
