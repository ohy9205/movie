const { configureStore, createSlice } = require("@reduxjs/toolkit");

const moviesSlice = createSlice({
  name: "movies",
  initialState: { boxOffice: [], recent: [], myMovies: [] },
  reducers: {
    getRecentMovies: (state, action) => {
      state.recent = action.payload;
    },
    getBoxOfficeMovies: (state, action) => {
      state.boxOffice = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { movies: moviesSlice.reducer },
});

export const moviesAction = moviesSlice.actions;