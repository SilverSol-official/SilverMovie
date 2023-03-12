import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store/store";
import { PopUpId } from "../../types";

export const fetchMovie = createAsyncThunk(
  "id/fetchMovie",
  async function (id: PopUpId | string = "tt0371746", { rejectWithValue }) {
    console.log("id", id);
    if (id == "") {
      id = "tt0371746";
    }
    const url: string = `https://www.omdbapi.com/?apikey=5ec55c48&i=${id}`;
    console.log("url:", url);
    try {
      const responce = await fetch(url);
      if (!responce.ok) {
        throw new Error("error");
      }
      const data = await responce.json();
      console.log("data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state: RootState, action: PayloadAction) => {
  state.idStatus = "rejected";
  state.idError = action.payload;
};

interface InitialStateType {
  idStatus: "loading" | "resolved" | "rejected";
  idError: string;
  idResult: {};
}

const initialState: InitialStateType = {
  idStatus: "loading",
  idError: null,
  idResult: {},
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovie.pending]: (state: RootState) => {
      state.idStatus = "loading";
      state.idError = null;
      console.log("pending");
    },
    [fetchMovie.fulfilled]: (
      state: RootState,
      action: PayloadAction<object>
    ) => {
      state.idStatus = "resolved";
      state.idResult = action.payload;
      console.log("state f info", state.idResult);
    },
    [fetchMovie.rejected]: setError,
  },
});

export default idSlice.reducer;
