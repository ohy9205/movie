import { moviesSlice } from "./movie-slice";
import { pickSlice } from "./pick-slice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: { movies: moviesSlice.reducer, pick: pickSlice.reducer },
});
