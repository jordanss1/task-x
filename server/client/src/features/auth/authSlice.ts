import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  axiosCreateProfile,
  axiosDeleteProfile,
  axiosFetchUser,
  axiosUpdateProfile,
} from "../../api";
import { StateType } from "../../app/store";
import { UserStateType, UserType, ValidUserType } from "../../types";
import { setError, setSuccess } from "../notification/notificationSlice";
import { updateUserProfileContent } from "../taskWall/taskWallSlice";

export const getUser = createAsyncThunk<UserType | undefined>(
  "auth/user",
  async () => {
    return await axiosFetchUser();
  }
);

export const createProfile = createAsyncThunk<
  UserType | ValidUserType,
  Omit<ValidUserType["profile"], "_user">,
  { state: StateType }
>("auth/createProfile", async (profile, { getState, dispatch }) => {
  const { user } = getState().auth;
  dispatch(setUpdatedProfile(true));

  try {
    return await axiosCreateProfile(profile);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return user as UserType;
  }
});

export const deleteProfile = createAsyncThunk<
  void,
  undefined,
  { state: StateType }
>("auth/createProfile", async (undefined, { dispatch, getState }) => {
  const { authFetching } = getState().auth;
  if (!authFetching) {
    dispatch(setAuthFetching(true));
  }

  try {
    await axiosDeleteProfile();

    dispatch(setSuccess("Your profile has been deleted"));

    if (authFetching) {
      dispatch(setAuthFetching(false));
    }

    dispatch(setDeletedProfile(true));
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    if (authFetching) {
      dispatch(setAuthFetching(false));
    }
  }
});

export const updateProfile = createAsyncThunk<
  ValidUserType,
  Omit<ValidUserType["profile"], "_user">,
  { state: StateType }
>("auth/updateProfile", async (profile, { dispatch, getState }) => {
  const { user } = getState().auth;

  try {
    const user = await axiosUpdateProfile(profile);

    await dispatch(updateUserProfileContent());

    dispatch(setSuccess("Profile updated successfully"));
    return user;
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return user as ValidUserType;
  }
});

type AuthStateType = {
  user: UserStateType;
  updatedProfile: boolean;
  authFetching: boolean;
  deletedProfile: boolean;
};

const initialState: AuthStateType = {
  user: null,
  updatedProfile: false,
  authFetching: false,
  deletedProfile: false,
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
    setUpdatedProfile: (state, action: PayloadAction<boolean>) => {
      state.updatedProfile = action.payload;
    },
    setAuthFetching: (state, action: PayloadAction<boolean>) => {
      state.authFetching = action.payload;
    },
    setDeletedProfile: (state, action: PayloadAction<boolean>) => {
      state.deletedProfile = action.payload;
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
        (action) =>
          ["auth/createProfile", "auth/updateProfile"].some((type) =>
            action.type.includes(type)
          ),
        (state, action: PayloadAction<ValidUserType | UserType>) =>
          reducerMatcherFunction(action, () => {
            state.user = action.payload;
          })
      );
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const { setUpdatedProfile, setAuthFetching, setDeletedProfile } =
  authSlice.actions;

export const authSelector: AuthSelectorType = (state) => state.auth;

export default authSlice.reducer;
