import axios from "axios";
import { addMovie, searchMovies } from "../api/firebase";
import { dataFormat } from "../util/data";
import { getTodayDate } from "../util/date";
import { moviesAction } from "./movie-store";

/** api 사용 */
const moviesClient = axios.create({
  baseURL: "/search_json2.jsp",
  params: {
    collection: "kmdb_new2",
    ServiceKey: process.env.REACT_APP_MOVIES_SERVICE_KEY,
    detail: "Y",
  },
});

const boxOfficeClient = axios.create({
  baseURL: "/searchDailyBoxOfficeList.json",
  params: {
    key: process.env.REACT_APP_BOX_OFFICE_KEY,
    targetDt: getTodayDate(),
  },
});

// 박스 오피스 데이터를 들고옴
const getBoxOffice = async () => {
  const response = await boxOfficeClient.get("");
  const responseData = response.data.boxOfficeResult.dailyBoxOfficeList;
  return await responseData.map((data) => ({
    movieCode: data.movieCd,
    title: data.movieNm,
    releaseDate: data.openDt.replace(/-/g, ""),
  }));
};

// 박스오피스 영화 정보 패칭
export const getBoxOfficeMovies = async (boxOfficeData) => {
  let moviesList = [];

  for await (const data of boxOfficeData) {
    const movie = await searchMovies(data);
    if (!movie) {
      const response = await moviesClient.get("", {
        params: {
          title: data.title,
          releaseDts: data.releaseDate,
        },
      });

      if (response) {
        const movieFormat = dataFormat(response)[0];
        moviesList.push(movieFormat);
        saveMovie(movieFormat);
      }
    } else {
      moviesList.push(movie);
    }
  }
  return moviesList;
};

// db에 박스오피스 데이터 저장
export const saveMovie = async (movie) => {
  addMovie(movie);
};

// 리덕스에 박스오피스 데이터 저장
export const getBoxOfficeMoviesFetch = () => {
  return async (dispatch) => {
    const boxOfficeData = await getBoxOffice(); // 박스오피스 데이터를 불러오고
    if (boxOfficeData) {
      const moviesList = await getBoxOfficeMovies(boxOfficeData); // 데이터에 해당하는 영화정보를 불러오고 (없으면 db에 저장하고)

      // 리덕스에 저장
      dispatch(moviesAction.getBoxOfficeMovies(moviesList));
    }
  };
};

// 최신 영화 데이터 패칭
export const getRecentMoviesFetch = () => {
  return async (dispatch) => {
    const response = await moviesClient.get("", {
      params: {
        listCount: 15,
        releaseDts: getTodayDate(),
      },
    });
    const recentMovies = dataFormat(response);
    dispatch(moviesAction.getRecentMovies(recentMovies));
  };
};
