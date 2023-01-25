import { MovieService } from "../../api/movieService";
import { pickAction } from "./pick-slice";

const movie = new MovieService();
const { getPick, addPick, removePick } = movie;

export const getPickFetch = (userUid) => {
  return (dispatch) => {
    getPick(userUid, (movies) => dispatch(pickAction.get(movies)));
  };
};

export const addPickFetch = (userUid, movie) => {
  return () => {
    addPick(userUid, { ...movie, pickDate: new Date().getTime() });
  };
};

export const removePickFetch = (userUid, movieId) => {
  return () => {
    removePick(userUid, movieId);
  };
};
