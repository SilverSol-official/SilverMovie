import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MovieName } from "../../types";
import { RootState } from "../Store/store";

export const fetchSearch = createAsyncThunk(
  "movie/fetchSearch",
  async function (searchField: string = "Iron Man", { rejectWithValue }) {
    if (searchField == "") {
      searchField = "iron man";
    }
    const url = `https://www.omdbapi.com/?apikey=5ec55c48&s=${searchField}`;
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

const setError = (state, action) => {
  state.searchStatus = "rejected";
  state.searchError = action.payload;
};

interface InitialStateType {
  searchStatus: "loading" | "resolved" | "rejected";
  searchError: string;
  searchResult: { Search: MovieName[] };
}

const initialState: InitialStateType = {
  searchStatus: "loading",
  searchError: null,
  searchResult: { Search: [] },
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  // extraReducers: {
  //   [fetchSearch.pending.toString()]: (state: RootState) => {
  //     state.searchStatus = "loading";
  //     state.searchError = null;
  //     console.log("pending");
  //   },

  //   [fetchSearch.fulfilled.toString()]: (
  //     state: RootState,
  //     action: PayloadAction<object>
  //   ) => {
  //     state.searchStatus = "resolved";
  //     state.searchResult = action.payload;
  //     console.log("state w info", state.searchResult);
  //   },
  //   [fetchSearch.rejected.toString()]: setError,
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.searchStatus = "loading";
      state.searchError = null;
      console.log("pending");
    }),
      builder.addCase(fetchSearch.fulfilled, (state, action) => {
        state.searchStatus = "resolved";
        state.searchResult = action.payload;
        console.log("state w info", state.searchResult);
      }),
      builder.addCase(fetchSearch.rejected, () => {
        setError;
      });
  },
});

export default movieSlice.reducer;
