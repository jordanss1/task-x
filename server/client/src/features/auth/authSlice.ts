import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosFetchUser, axiosUpdateProfile } from "../../api";
import { StateType } from "../../app/store";
import { UserStateType, UserType } from "../../types";
import { setError } from "../error/errorSlice";

export const getUser = createAsyncThunk<UserType | undefined>(
  "auth/user",
  async () => {
    return await axiosFetchUser();
  }
);

export const updateProfile = createAsyncThunk<
  UserType,
  NonNullable<UserType["profile"]>,
  { state: StateType }
>("auth/profile", async (profile, { getState, dispatch }) => {
  const { user } = getState().auth;

  try {
    return await axiosUpdateProfile(profile);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return user as UserType;
  }
});

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

      .addDefaultCase((state, action) => state);
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => state.auth;

export default authSlice.reducer;
