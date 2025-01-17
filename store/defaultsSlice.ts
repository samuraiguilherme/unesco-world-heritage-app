import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./thunks";
import { handleGetDefaults, IDefaults } from "@/app/api/sites";

type DefaultsFetchStatus = "idle" | "pending" | "succeeded" | "failed";

interface IDefaultsSlice {
  statusDefaults: DefaultsFetchStatus;
  error: string | null;
  countries: IDefaults;
}

const defaultsSliceInitialState: IDefaultsSlice = {
  statusDefaults: "idle",
  error: null,
  countries: {},
};

export const defaultsSlice = createSlice({
  name: "defaultsSlice",
  initialState: defaultsSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaults.pending, (state) => {
        state.statusDefaults = "pending";
      })
      .addCase(fetchDefaults.fulfilled, (state, action) => {
        state.statusDefaults = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchDefaults.rejected, (state, action) => {
        state.statusDefaults = "failed";
        state.error = action.error.message ?? "Error fetching Defaults";
      });
  },
});

export const fetchDefaults = createAppAsyncThunk(
  "defaults/fetchDefaults",
  async () => {
    const data = await handleGetDefaults();
    return data;
  }
);

export default defaultsSlice.reducer;
