const { configureStore, createSlice } = require("@reduxjs/toolkit");

const moviesSlice = createSlice({
  name: "movies",
  initialState: { boxOffice: [], recent: [], myMovies: [], search: [] },
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
      movieList.sort((a, b) => a.title.length - b.title.length);
      state.search = movieList;
    },
  },
});

export const store = configureStore({
  reducer: { movies: moviesSlice.reducer },
});

export const moviesAction = moviesSlice.actions;
