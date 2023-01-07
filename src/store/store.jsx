import { moviesSlice } from "./movie/movie-slice";
import { pickSlice } from "./pick/pick-slice";
import { communitySlice } from "./community/community-slice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    pick: pickSlice.reducer,
    community: communitySlice.reducer,
  },
});
