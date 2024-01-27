import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { axiosGetNotifications } from "../../api";
import { StateType } from "../../app/store";
import {
  AllNotificationsReturnType,
  AwardNotificationType,
  CommentAndLikeNotificationType,
} from "../../types";

export const getNotifications = createAsyncThunk<
  AllNotificationsReturnType | false,
  undefined,
  { state: StateType }
>("notifications/getNotifications", async () => {
  try {
    return await axiosGetNotifications();
  } catch (err) {
    if (err instanceof AxiosError) {
    }
    return false;
  }
});

type NotificationStateType = {
  notifications:
    | (CommentAndLikeNotificationType | AwardNotificationType)[]
    | null
    | false;
  error: null | string;
  success: null | string;
};

const initialState: NotificationStateType = {
  notifications: null,
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
  extraReducers: (builders) => {
    builders.addMatcher(
      (action) => action.type.includes("notifications/getNotifications"),
      (state, action: PayloadAction<AllNotificationsReturnType | false>) => {
        if (!action.payload) {
          state.notifications = state.notifications
            ? state.notifications
            : false;
          return;
        }

        if (action.payload.every((arr) => !arr.length)) {
          state.notifications = state.notifications
            ? state.notifications
            : false;
          return;
        }

        state.notifications = (
          [] as (AwardNotificationType | CommentAndLikeNotificationType)[]
        )
          .concat(...action.payload)
          .sort(
            (notiA, notiB) =>
              dayjs(notiB.created).valueOf() - dayjs(notiA.created).valueOf()
          );
      }
    );
  },
});

type NotificationSelectorType = (state: StateType) => NotificationStateType;

export const notificationSelector: NotificationSelectorType = (state) =>
  state.notification;

export const { setError, setSuccess } = notificationSlice.actions;

export default notificationSlice.reducer;
