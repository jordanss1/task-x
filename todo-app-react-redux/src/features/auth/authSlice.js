import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  userProfile: null,
  beenSignedIn: null,
  beenSignedOut: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: {
      reducer(state, action) {
        state.isSignedIn = true;
        state.userProfile = action.payload;
      },
      prepare({ sub, name, picture }) {
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
  },
});

export const authSelector = (state) => state.auth;

export const { signIn, signOut, signingIn, signingOut } = authSlice.actions;

export default authSlice.reducer;
