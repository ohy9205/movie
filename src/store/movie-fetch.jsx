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
export const getBoxOfficeMovies = (boxOfficeData) => {
  // map으로 순회
  // db에서 데이터 찾고, 없으면 k에서 찾음
  return boxOfficeData.map(async (data) => {
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
        saveMovie(movieFormat);
        return movieFormat;
      } else {
        return null;
      }
    } else {
      return movie;
    }
  });
};

// db에 데이터 저장
export const saveMovie = async (movie) => {
  // console.log(movie);
  addMovie(movie);
  // await movies.map((movie) => addMovie(movie));
};

// 리덕스에 저장
export const getBoxOfficeMoviesFetch = () => {
  return async (dispatch) => {
    const boxOfficeData = await getBoxOffice();
    console.log(boxOfficeData);
    if (boxOfficeData) {
      const boxOfficeMovies = await Promise.all(
        getBoxOfficeMovies(boxOfficeData)
      );
      dispatch(moviesAction.getBoxOfficeMovies(boxOfficeMovies));
    } else {
    }
  };
};

// 최신 영화 데이터 패칭
export const getRecentMoviesFetch = () => {
  return async (dispatch) => {
    const response = await moviesClient.get("", {
      params: {
        listCount: 10,
        releaseDts: getTodayDate(),
      },
    });
    const recentMovies = dataFormat(response);
    console.log(recentMovies);
    dispatch(moviesAction.getRecentMovies(recentMovies));
  };
};

// 특정 영화 검색
export const getMovie = async (data) => {
  return await searchMovies(data);
};
