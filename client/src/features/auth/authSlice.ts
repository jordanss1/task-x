import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

export type UserProfileType = {
  userId: string;
  name: string;
  img: string;
};

export interface AuthStateType {
  isSignedIn: boolean;
  userProfile: UserProfileType | null;
}

const initialState: AuthStateType = {
  isSignedIn: false,
  userProfile: null,
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
  },
});

type AuthSelectorType = (state: StateType) => AuthStateType;

export const authSelector: AuthSelectorType = (state) => state.auth;

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
