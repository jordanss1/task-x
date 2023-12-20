import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGetProfileIcons } from "../../api";
import { StateType } from "../../app/store";

export const getProfileIcons = createAsyncThunk(
  "assets/profileIcons",
  async (): Promise<string[]> => {
    return await axiosGetProfileIcons();
  }
);

type AssetsStateType = {
  profileIcons: null | false | string[];
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
        state.profileIcons = action.payload?.length > 0 ? action.payload : false;
      }
    );
  },
});

type AssetsSelectorType = (state: StateType) => AssetsStateType;

export const assetsSelector: AssetsSelectorType = (state) => state.assets;

export default assetsSlice.reducer;
