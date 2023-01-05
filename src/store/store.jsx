import { moviesSlice } from "./movie-slice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: { movies: moviesSlice.reducer },
});
