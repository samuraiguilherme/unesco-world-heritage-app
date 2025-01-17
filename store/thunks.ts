import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "./rootStore";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
