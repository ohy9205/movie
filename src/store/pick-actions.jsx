import { addPick, getPick, removePick } from "../api/firebase";
import { pickAction } from "./pick-slice";

//
export const getPickFetch = (userUid) => {
  return (dispatch) => {
    getPick(userUid, (movies) => dispatch(pickAction.get(movies)));
    // console.log(response);

    // if (response) {
    //   console.log(response);
    //   dispatch(pickAction(response));
    // }
  };
};

export const addPickFetch = (userUid, movie) => {
  return (dispatch) => {
    console.log(userUid);
    addPick(userUid, { ...movie, pickDate: new Date().getTime() });
  };
};

export const removePickFetch = (userUid, movieId) => {
  return () => {
    removePick(userUid, movieId);
  };
};
