import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store/store";
import { MovieID, PopUpId } from "../../types";

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

const setError = (state, action: PayloadAction) => {
  state.idStatus = "rejected";
  state.idError = action.payload;
};

interface InitialStateType {
  idStatus: "loading" | "resolved" | "rejected";
  idError: string;
  idResult: MovieID;
}

const initialState: InitialStateType = {
  idStatus: "loading",
  idError: null,
  idResult: {
    Title: "string",
    Released: "string",
    Genre: "string",
    Actors: "string",
    BoxOffice: "string",
    Plot: "string",
    imdbRating: "string",
    Poster: "string",
  },
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovie.pending as unknown as string]: (state) => {
      state.idStatus = "loading";
      state.idError = null;
      console.log("pending");
    },
    [fetchMovie.fulfilled as unknown as string]: (
      state,
      action: PayloadAction<MovieID>
    ) => {
      state.idStatus = "resolved";
      state.idResult = action.payload;
      console.log("state f info", state.idResult);
    },
    [fetchMovie.rejected as unknown as string]: setError,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchMovie.pending, (state: RootState) => {
  //     state.idStatus = "loading";
  //     state.idError = null;
  //     console.log("pending");
  //   }),
  //     builder.addCase(fetchMovie.fulfilled, (state: RootState, action) => {
  //       state.idStatus = "resolved";
  //       state.idResult = action.payload;
  //       console.log("state w info", state.idResult);
  //     }),
  //     builder.addCase(fetchMovie.rejected, () => {
  //       setError;
  //     });
  // },
});

export default idSlice.reducer;
