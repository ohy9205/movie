import { createSlice, current } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
  name: "community",
  initialState: { posts: [], comment: [] },
  reducers: {
    add: (state, action) => {
      console.log(current(state));
      state.posts.push(action.payload);
    },
    get: (state, action) => {
      const postList = action.payload;
      state.posts = postList ? postList : state.posts;
    },
  },
});

export const communityAction = communitySlice.actions;
