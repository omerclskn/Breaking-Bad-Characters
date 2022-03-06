import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

const char_limit = 12;

export const fetchCharactersAsync = createAsyncThunk(
  "characters/getCharacters",
  async ({ page, filterName = "" }) => {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/characters?name=${filterName}&limit=${char_limit}&offset=${
        page * char_limit
      }`
    );
    return data;
  }
);

export const characterSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    page: 0,
    hasNextPage: true,
    filterName: "",
  },
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
      state.status = "idle";
      state.page = 0;
    },
  },
  extraReducers: {
    // get characters
    [fetchCharactersAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCharactersAsync.fulfilled]: (state, action) => {
      state.hasNextPage = true;
      state.items =
        state.filterName || state.page === 0
          ? action.payload
          : [...state.items, ...action.payload];
      if (action.payload.length < char_limit) state.hasNextPage = false;
      state.page += 1;
      state.status = "succeeded";
      message.success(`${state.items.length} characters loaded`);
    },
    [fetchCharactersAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      message.error(action.error.message);
      state.status = "failed";
    },
  },
});

export const { setFilterName } = characterSlice.actions;
export default characterSlice.reducer;
