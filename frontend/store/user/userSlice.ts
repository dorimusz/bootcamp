import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  avatar_url: string;
  login: string;
  type: string;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    //legeneral egy actiont, ami a stateket befolyasolja
    refreshUsers: (state, action) => {
      state.users = [];
    },
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export const { reducer, actions } = userSlice;
export const { refreshUsers, setUsers } = userSlice.actions;
