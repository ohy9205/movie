/** 날짜 정보 YYYYMMDD */
export const getPeriodDate = (period = 0) => {
  //오늘 날짜를 기준으로, -period 기간의 날짜를 반환
  const today = new Date();
  const dayAgo = new Date(today.setDate(today.getDate() - period));

  const date = new Date(dayAgo);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${month < 10 ? `0${month}` : month}${
    day < 10 ? `0${day}` : day
  }`;
};

/** 날짜 포맷 */
export const changeDateFormat = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}-${month}-${day}`;
  // const newDate = new Date(parseInt(date));
  // const year = newDate.getFullYear();
  // const month = newDate.getMonth() + 1;
  // const day = newDate.getDate();
  // return `${year}-${month < 10 ? `0${month}` : month}-${
  //   day < 10 ? `0${day}` : day
  // }`;
};
