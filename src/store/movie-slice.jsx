import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: { boxOffice: [], recent: [], search: [], random: [] },
  reducers: {
    getRecentMovies: (state, action) => {
      const movieList = action.payload;
      movieList.sort((a, b) => b.releaseDate - a.releaseDate);
      state.recent = movieList;
    },
    getBoxOfficeMovies: (state, action) => {
      state.boxOffice = action.payload;
    },
    searchMovies: (state, action) => {
      const movieList = action.payload;
      movieList && movieList.sort((a, b) => a.title.length - b.title.length);
      state.search = movieList;
    },
    getRandomMovies: (state, action) => {
      const movieList = action.payload;
      movieList.sort((a, b) => a.title.length - b.title.length);
      state.random = movieList;
    },
  },
});

export const moviesAction = moviesSlice.actions;
