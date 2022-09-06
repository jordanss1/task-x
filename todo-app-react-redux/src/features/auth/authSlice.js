import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: null,
  userProfile: null,
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
  },
});

export const authSelector = (state) => state.auth;

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
