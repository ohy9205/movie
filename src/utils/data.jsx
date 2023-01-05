/** db에 저장할 데이터 추출 */
export const changeDataFormat = (data) => {
  const {
    movieSeq,
    Codes: {
      Code: [{ CodeNo }],
    },
    title,
    genre,
    repRlsDate,
    prodYear,
    posters,
    plots: {
      plot: [{ plotText }],
    },
    runtime,
    rating,
    nation,
    titleEng,
    titleOrg,
    directors: {
      director: [{ directorNm }],
    },
    actors: { actor },
  } = data;

  /**정규표현식으로 제목 수정 */
  let titleForamt = title
    .replace(/!HS/g, "")
    .replace(/!HE/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ");

  return {
    id: movieSeq,
    movieCode: CodeNo,
    genre,
    title: titleForamt,
    releaseDate: repRlsDate,
    prodYear,
    poster: posters.split("|")[0],
    summary: plotText,
    runtime,
    rating,
    nation,
    titleEng,
    titleOrg,
    director: directorNm,
    actors: actor.map((it) => it.actorNm),
    createDate: new Date().getTime(),
  };
};
