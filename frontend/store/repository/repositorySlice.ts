import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const repositorySlice = createSlice({
  name: "repository",
  initialState: {
    repository: [],
    filter: "",
  },
  reducers: {
    setRepository: (state, action: PayloadAction<any>) => {
      state.repository = action.payload;
    },
    filterLanguage: (state, action: PayloadAction<any>) => {
      state.filter = action.payload;
      // state.repository.filter = action.payload;
    },
  },
});
export const { reducer, actions } = repositorySlice;
export const { setRepository, filterLanguage } = repositorySlice.actions;
