import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import {
  axiosGetNotifications,
  axiosUpdateNotificationStatus,
} from "../../api";
import { StateType } from "../../app/store";
import {
  AllNotificationsReturnType,
  AwardNotificationType,
  CommentAndLikeNotificationType,
  TaskWallTaskType,
} from "../../types";
import { setTaskWallFetching } from "../taskWall/taskWallSlice";

export const getNotifications = createAsyncThunk<
  AllNotificationsReturnType | false,
  undefined,
  { state: StateType }
>("notifications/getNotifications", async () => {
  try {
    return await axiosGetNotifications();
  } catch (err) {
    return false;
  }
});

export const updateNotificationStatus = createAsyncThunk<
  void,
  string,
  { state: StateType }
>(
  "notifications/updateNotificationStatus",
  async (taskId, { dispatch, getState }) => {
    const { notificationFetching } = getState().notification;

    if (!notificationFetching) {
      dispatch(setNotificationFetching(true));
    }

    try {
      await axiosUpdateNotificationStatus(taskId);
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data));
      }
    } finally {
      dispatch(setNotificationFetching(false));
    }
  }
);

type NotificationStateType = {
  notifications:
    | (CommentAndLikeNotificationType | AwardNotificationType)[]
    | null
    | false;
  notificationId: string | null;
  notificationFetching: boolean;
  error: null | string;
  success: null | string;
};

const initialState: NotificationStateType = {
  notifications: null,
  notificationId: null,
  notificationFetching: false,
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
    setNotificationFetching: (state, action: PayloadAction<boolean>) => {
      state.notificationFetching = action.payload;
    },
    setNotificationId: (state, action: PayloadAction<string | null>) => {
      state.notificationId = action.payload;
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

export const {
  setError,
  setSuccess,
  setNotificationFetching,
  setNotificationId,
} = notificationSlice.actions;

export default notificationSlice.reducer;
