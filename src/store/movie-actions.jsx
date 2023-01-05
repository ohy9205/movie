import axios from "axios";
import { addMovie, getMovie } from "../api/firebase";
import { changeDataFormat } from "../utils/data";
import { getPeriodDate } from "../utils/date";
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
    targetDt: getPeriodDate() - 1,
  },
});

// api response에서 영화 정보 추출
const getResponseMovieData = (response) => {
  return response.data.Data[0].Result;
};

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

// 박스오피스 영화 정보 검색
export const getBoxOfficeMovies = async (boxOfficeData) => {
  let moviesList = [];

  for await (const data of boxOfficeData) {
    const movie = await getMovie(data);
    if (!movie) {
      const response = await moviesClient.get("", {
        params: {
          title: data.title,
          releaseDts: data.releaseDate,
        },
      });

      const responseData = getResponseMovieData(response);
      if (responseData) {
        const responseData = getResponseMovieData(response);
        for (const data of responseData) {
          const formattedData = changeDataFormat(data);
          addMovie(formattedData);
          moviesList.push(formattedData);
        }
      }
    } else {
      moviesList.push(movie);
    }
  }
  return moviesList;
};

// 리덕스에 박스오피스 데이터 저장
export const getBoxOfficeMoviesFetch = () => {
  return async (dispatch) => {
    const boxOfficeData = await getBoxOffice(); // 박스오피스 데이터를 불러오고
    if (boxOfficeData) {
      const moviesList = await getBoxOfficeMovies(boxOfficeData); // db에서 데이터에 해당하는 영화정보를 불러오고 (없으면 db에 저장하고)

      // 리덕스에 저장
      dispatch(moviesAction.getBoxOfficeMovies(moviesList));
    }
  };
};

// 최신 영화 데이터 패칭
export const getRecentMoviesFetch = () => {
  let moviesList = [];

  return async (dispatch) => {
    const response = await moviesClient.get("", {
      params: {
        listCount: 50,
        releaseDts: getPeriodDate(14),
        releaseDte: getPeriodDate(),
      },
    });

    // db에 해당 데이터 있는지 확인하고 만약 데이터가 없으면 db에 저장
    const responseData = getResponseMovieData(response);
    if (responseData) {
      const responseData = getResponseMovieData(response);
      for (const data of responseData) {
        const formattedData = changeDataFormat(data);
        if (
          formattedData.releaseDate.length !== 8 ||
          formattedData.releaseDate.substring(6, 8) === "00"
        ) {
          continue;
        }

        moviesList.push(formattedData);

        const movie = await getMovie(formattedData);
        if (!movie) {
          addMovie(formattedData);
        }
      }
    }

    dispatch(moviesAction.getRecentMovies(moviesList));
  };
};

// 영화 검색
export const searchMovieFetch = (search) => {
  let movieList = [];
  return async (dispatch) => {
    const response = await moviesClient.get("", {
      params: {
        title: search.title,
        genre: search.genre,
        sort: "prodYear,1",
        listCount: 100,
      },
    });

    const responseData = getResponseMovieData(response);
    if (responseData) {
      for (const data of responseData) {
        if (movieList.length >= 30) {
          break;
        }

        const formattedData = changeDataFormat(data);

        // 공백 제거하고 제목 일치여부 검사
        const formattedDataTitle = formattedData.title.replace(/ /g, "");
        const searchTitle = search.title.replace(/ /g, "");

        if (formattedDataTitle.indexOf(searchTitle) !== -1) {
          addMovie(formattedData);
          movieList.push(formattedData);
        } else {
          continue;
        }
      }
      dispatch(moviesAction.searchMovies(movieList));
    }
  };
};
