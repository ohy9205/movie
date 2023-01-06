import { createSlice } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
  name: "community",
  initialState: { postList: [], comment: [] },
  reducers: {
    add: (state, action) => {
      state.postList.push(action.payload);
    },
  },
});

export const communityAction = communitySlice.actions;
