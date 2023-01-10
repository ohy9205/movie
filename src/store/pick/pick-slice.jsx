import { createSlice } from "@reduxjs/toolkit";

export const pickSlice = createSlice({
  name: "pick",
  initialState: { pick: [] },
  reducers: {
    get: (state, action) => {
      if (action.payload) {
        state.pick = Object.values(action.payload);
      } else {
        state.pick = [];
      }
    },
  },
});

export const pickAction = pickSlice.actions;
