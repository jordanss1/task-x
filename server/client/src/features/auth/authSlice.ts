import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosFetchUser, axiosUpdateProfile } from "../../api";
import { StateType } from "../../app/store";
import { UserStateType, UserType, ValidUserType } from "../../types";
import { setError } from "../notification/notificationSlice";

export const getUser = createAsyncThunk<UserType | undefined>(
  "auth/user",
  async () => {
    return await axiosFetchUser();
  }
);

export const updateProfile = createAsyncThunk<
  UserType | ValidUserType,
  ValidUserType["profile"],
  { state: StateType }
>("auth/profile", async (profile, { getState, dispatch }) => {
  const { user } = getState().auth;
  dispatch(setUpdatedProfile(true));

  try {
    return await axiosUpdateProfile(profile);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError("hi"));
    }

    return user as UserType;
  }
});

type AuthStateType = {
  user: UserStateType;
  updatedProfile: boolean;
};

const initialState: AuthStateType = {
  user: null,
  updatedProfile: false,
};

type ReducerMatcherType = (
  action: AnyAction,
  fulfilledFunc: () => void
) => void;

export const reducerMatcherFunction: ReducerMatcherType = (
  action,
  fulfilledFunc
) => {
  if (action.type.includes("fulfilled")) fulfilledFunc();
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUpdatedProfile: (state, action) => {
      state.updatedProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.includes("auth/user"),
        (state, action: PayloadAction<UserType | undefined>) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload || false;
          })
      )
      .addMatcher(
        (action) => action.type.includes("auth/profile"),
        (state, action: PayloadAction<ValidUserType | UserType>) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload;
          })
      )

      .addDefaultCase((state, action) => state);
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const { setUpdatedProfile } = authSlice.actions;

export const authSelector: AuthSelectorType = (state) => state.auth;

export default authSlice.reducer;
