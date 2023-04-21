import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/posts`);
    return data;
  } catch (error) {
    // return rejectWithValue(error);
  }
});


export const getSinglePost = createAsyncThunk(
  "author/getSinglePost",
  async (id) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/posts/${id}`);

      const { data: userData } = await axios.get(
        `https://dummyjson.com/users/${data.userId}`
      );

      if (userData) data.user = userData;
      return data;
    } catch (error) {
      console.log(" ", error);
    }
  }
);
const initialState = {
  data: [],
  Author: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getUserList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
   
    [getSinglePost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getSinglePost.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
