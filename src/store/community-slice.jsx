import { createSlice, current } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
  name: "community",
  initialState: { posts: [], comment: [] },
  reducers: {
    add: (state, action) => {
      state.posts.push(action.payload);
    },
    get: (state, action) => {
      const postList = action.payload;
      state.posts = postList ? postList : state.posts;
    },
    update: (state, action) => {
      const updatePost = action.payload;
      const statePosts = current(state.posts);

      state.posts = statePosts.map((post) => {
        return post.id === updatePost.id && { ...post, ...updatePost };
      });
    },
    remove: (state, action) => {
      const statePosts = current(state.posts);
      const postId = action.payload;
      state.posts = statePosts.filter((post) => post.id !== postId);
    },
  },
});

export const communityAction = communitySlice.actions;
