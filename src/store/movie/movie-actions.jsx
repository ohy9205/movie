import axios from "axios";
import { MovieService } from "../../api/movieService";
import { changeDataFormat } from "../../utils/data";
import { getPeriodDate } from "../../utils/date";
import { moviesAction } from "./movie-slice";

const movie = new MovieService();
const { add, search, get } = movie;

/** api 사용 */
const moviesClient = axios.create({
  // baseURL: "/search_json2.jsp",
  baseURL:
    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp",
  params: {
    collection: "kmdb_new2",
    ServiceKey: process.env.REACT_APP_MOVIES_SERVICE_KEY,
    detail: "Y",
  },
});

const boxOfficeClient = axios.create({
  // baseURL: "/searchDailyBoxOfficeList.json",
  baseURL:
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
  params: {
    key: process.env.REACT_APP_BOX_OFFICE_KEY,
    targetDt: getPeriodDate() - 1,
  },
});

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
        listCount: 30,
        releaseDts: getPeriodDate(14),
        releaseDte: getPeriodDate(),
      },
    });

    // db에 해당 데이터 있는지 확인하고 만약 데이터가 없으면 db에 저장
    const responseData = getResponseMovieData(response);

    if (responseData) {
      for (const data of responseData) {
        const formattedData = changeDataFormat(data);
        if (
          formattedData.releaseDate.length !== 8 ||
          formattedData.releaseDate.substring(6, 8) === "00"
        ) {
          continue;
        }

        movieList.push(formattedData);
        add(formattedData);

        if (movieList.length === 15) {
          break;
        }
      }
    }

    dispatch(
      moviesAction.getRecentMovies(
        movieList.length < 15 ? movieList.slice(0, 10) : movieList
      )
    );
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
        listCount: 50,
      },
    });

    const responseData = getResponseMovieData(response);

    if (responseData) {
      for (const data of responseData) {
        if (data.genre === "에로") continue;
        if (movieList.length >= 30) {
          break;
        }

        const formattedData = changeDataFormat(data);

        // 공백 제거하고 제목 일치여부 검사
        const formattedDataTitle = formattedData.title.replace(/ /g, "");
        const searchTitle = search.title.replace(/ /g, "");

        if (formattedDataTitle.indexOf(searchTitle) !== -1) {
          add(formattedData);
          movieList.push(formattedData);
        } else {
          continue;
        }
      }
    }
    dispatch(moviesAction.searchMovies(movieList));
  };
};

// 랜덤 영화 목록
export const getMovieFetch = () => {
  return async (dispatch) => {
    const movies = await get();
    if (movies.length > 0) {
      const filterMovies = movies.filter((movie) => movie.poster.length > 0);

      const randomSortedMovie = shuffle(filterMovies).splice(0, 10);
      dispatch(moviesAction.getRandomMovies(randomSortedMovie));
    }
  };
};

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

  for (const data of boxOfficeData) {
    // db에서 해당 데이터 검색
    const movie = await search(data);
    // db에 해당 데이터가 없으면 api에서 검색
    if (!movie) {
      const response = await moviesClient.get("", {
        params: {
          title: data.title,
          releaseDts: data.releaseDate.slice(0, 4),
        },
      });
      const responseData = getResponseMovieData(response);
      if (responseData && responseData.length > 0) {
        for (const data of responseData) {
          const formattedData = changeDataFormat(data);
          add(formattedData);
          movieList.push(formattedData);
        }
      }
    } else {
      movieList.push(movie);
    }
  }
  return movieList;
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
