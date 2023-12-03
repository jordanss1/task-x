import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGetProfileIcons } from "../../api";
import { StateType } from "../../app/store";

export const getProfileIcons = createAsyncThunk(
  "assets/profileIcons",
  async () => {
    return await axiosGetProfileIcons();
  }
);

type AssetsStateType = {
  profileIcons: null | string[];
};

const initialState: AssetsStateType = {
  profileIcons: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.includes("assets/profileIcons"),
      (state, action: PayloadAction<string[]>) => {
        state.profileIcons = action.payload;
      }
    );
  },
});

type AssetsSelectorType = (state: StateType) => AssetsStateType;

export const assetsSelector: AssetsSelectorType = (state) => state.assets;

export default assetsSlice.reducer;
