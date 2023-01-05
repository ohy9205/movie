/** 오늘날짜 YYYYMMDD */
export const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)
  );
};

/** 날짜 포맷 */
export const dateFormat = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.month() + 1;
  const day = newDate.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
