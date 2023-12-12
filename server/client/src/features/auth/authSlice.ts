import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosFetchUser } from "../../api";
import { StateType } from "../../app/store";
import { UserStateType, UserType } from "../../types";

export const getUser = createAsyncThunk<UserType | undefined>(
  "auth/user",
  async () => {
    return await axiosFetchUser();
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
        (action) => action.type.includes("auth/user"),
        (state, action: PayloadAction<UserType | undefined>) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload || false;
          })
      )

      .addDefaultCase((state, action) => state);
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => state.auth;

export default authSlice.reducer;
