import { addPick, getPick, removePick } from "../../api/firebase";
import { pickAction } from "./pick-slice";

//
export const getPickFetch = (userUid) => {
  return (dispatch) => {
    getPick(userUid, (movies) => dispatch(pickAction.get(movies)));
  };
};

export const addPickFetch = (userUid, movie) => {
  return () => {
    console.log(userUid);
    addPick(userUid, { ...movie, pickDate: new Date().getTime() });
  };
};

export const removePickFetch = (userUid, movieId) => {
  return () => {
    removePick(userUid, movieId);
  };
};
