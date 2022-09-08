import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contributionSlice = createSlice({
  name: "contribution",
  initialState: {
    contribution: [],
  },
  reducers: {
    setContribution: (state, action: PayloadAction<any>) => {
      state.contribution = action.payload;
    },
  },
});

export const { reducer, actions } = contributionSlice;
export const { setContribution } = contributionSlice.actions;
