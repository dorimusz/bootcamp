import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const repositorySlice = createSlice({
  name: "repository",
  initialState: {
    repository: [],
  },
  reducers: {
    // refreshRepository: (state, action) => {
    //   state.repository = [];
    // },
    setRepository: (state, action: PayloadAction<any>) => {
      state.repository = action.payload;
    },
  },
});

export const { reducer, actions } = repositorySlice;
export const { setRepository } = repositorySlice.actions;
