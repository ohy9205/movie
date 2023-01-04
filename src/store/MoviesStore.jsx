import axios from "axios";

const { configureStore, createSlice } = require("@reduxjs/toolkit");

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    getRecentMovies: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const store = configureStore({
  reducer: { movies: moviesSlice.reducer },
});

export const moviesAction = moviesSlice.actions;

/** api 사용 */
const httpClient = axios.create({
  baseURL: "/movies",
});

// 데이터 패칭
export const getRecentMoviesFetch = () => {
  return async (dispatch) => {
    /**
     * 1. api 요청
     * 2. 성공하면 필요한 정보만 뽑아서 반환 (제목, 포스터, 줄거리, 개봉일, 장르)
     */
    const response = await httpClient.get("/recent.json");
    const responseData = response.data.Data[0].Result;
    const recentMovies = responseData.map((data) => {
      const {
        movieSeq,
        title,
        genre,
        repRlsDate,
        posters,
        plots,
        runtime,
        rating,
        nation,
      } = data;

      return {
        id: movieSeq,
        genre,
        title,
        release: repRlsDate,
        poster: posters.split("|")[0],
        summary: plots.plot[0].plotText,
        runtime,
        rating,
        nation,
      };
    });
    await dispatch(moviesAction.getRecentMovies(recentMovies));
  };
};
