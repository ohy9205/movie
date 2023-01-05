import axios from "axios";
import { addMovie, getMovie, searchMovie } from "../api/firebase";
import { changeDataFormat } from "../utils/data";
import { getPeriodDate } from "../utils/date";
import { moviesAction } from "./movie-slice";

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
  let movieList = [];

  for await (const data of boxOfficeData) {
    const movie = await searchMovie(data);
    if (!movie) {
      console.log("boxoffice패칭");
      const response = await moviesClient.get("", {
        params: {
          title: data.title,
          releaseDts: data.releaseDate,
        },
      });

      const responseData = getResponseMovieData(response);
      if (responseData) {
        for (const data of responseData) {
          const formattedData = changeDataFormat(data);
          addMovie(formattedData);
          movieList.push(formattedData);
        }
      }
    } else {
      movieList.push(movie);
    }
  }
  return movieList;
};

// 리덕스에 박스오피스 데이터 저장
export const getBoxOfficeMoviesFetch = () => {
  return async (dispatch) => {
    const boxOfficeData = await getBoxOffice(); // 박스오피스 데이터를 불러오고
    if (boxOfficeData) {
      const movieList = await getBoxOfficeMovies(boxOfficeData); // db에서 데이터에 해당하는 영화정보를 불러오고 (없으면 db에 저장하고)

      // 리덕스에 저장
      dispatch(moviesAction.getBoxOfficeMovies(movieList));
    }
  };
};

// 최신 영화 데이터 패칭
export const getRecentMoviesFetch = () => {
  let movieList = [];

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

        movieList.push(formattedData);

        addMovie(formattedData);
      }
    }

    dispatch(moviesAction.getRecentMovies(movieList));
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

// 랜덤 영화 목록
export const getMovieFetch = () => {
  return async (dispatch) => {
    const movie = await getMovie();
    const randomSortedMovie = shuffle(movie)
      // .sort(() => Math.random() - 0.5)
      .splice(0, 30);
    dispatch(moviesAction.getRandomMovies(randomSortedMovie));
  };
};

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}
