import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

export type UserProfileType = {
  userId: string;
  name: string;
  img: string;
};

interface AuthStateType {
  isSignedIn: boolean;
  userProfile: UserProfileType | null;
  beenSignedIn: boolean;
  beenSignedOut: boolean;
  loading: boolean;
}

const initialState: AuthStateType = {
  isSignedIn: false,
  userProfile: null,
  beenSignedIn: false,
  beenSignedOut: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: {
      reducer(state, action: PayloadAction<UserProfileType>) {
        state.isSignedIn = true;
        state.userProfile = action.payload;
      },
      prepare({
        sub,
        name,
        picture,
      }: {
        sub: string;
        name: string;
        picture: string;
      }) {
        return {
          payload: {
            userId: sub,
            name: name,
            img: picture,
          },
        };
      },
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userProfile = null;
    },
    signingIn: (state) => {
      state.beenSignedIn = true;
      state.beenSignedOut = false;
    },
    signingOut: (state) => {
      state.beenSignedOut = true;
      state.beenSignedIn = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => state.auth;

export const { signIn, signOut, signingIn, signingOut, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
