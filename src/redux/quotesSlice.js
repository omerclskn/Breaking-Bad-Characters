import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const getQuotesAsync = createAsyncThunk("quotes/getQuotes", async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_API_URL}/quotes`
  );
  return data;
});

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    // get Quotes
    [getQuotesAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQuotesAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    [getQuotesAsync.rejected]: (state, action) => {
      state.error = action.error;
      message.error(action.error.message);
      state.status = "failed";
    },
  },
});

export default quotesSlice.reducer;
