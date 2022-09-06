import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    valueExample: 0,
  },
  reducers: {
    //legeneral egy actiont, ami a stateket befolyasolja
    example: (state) => {
      state.valueExample += 3;
    },
    exampleAction: (state, action: PayloadAction<number>) => {
      state.valueExample += action.payload;
    },
  },
});

export const { reducer, actions } = userSlice;
export const { example, exampleAction } = userSlice.actions;
