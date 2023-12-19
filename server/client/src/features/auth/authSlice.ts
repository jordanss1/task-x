import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosFetchUser, axiosUpdateProfile } from "../../api";
import { StateType } from "../../app/store";
import { UserStateType, UserType } from "../../types";

export const getUser = createAsyncThunk<UserType | undefined>(
  "auth/user",
  async () => {
    return await axiosFetchUser();
  }
);

export const updateProfile = createAsyncThunk<UserType, UserType["profile"]>(
  "auth/profile",
  async (profile) => {
    return await axiosUpdateProfile(profile);
  }
);

type AuthStateType = {
  user: UserStateType;
};

const initialState: AuthStateType = {
  user: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          ["auth/user", "auth/profile"].some((value) =>
            action.type.includes(value)
          ),
        (state, action: PayloadAction<UserType | undefined>) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload || false;
          })
      )
      .addMatcher(
        (action) => action.type.includes("auth/profile"),
        (state, action: PayloadAction<UserType>) => {
          state.user;
        }
      )

      .addDefaultCase((state, action) => state);
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => state.auth;

export default authSlice.reducer;
