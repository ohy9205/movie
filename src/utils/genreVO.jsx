const genreObj = {
  DRAMA: "드라마",
  FEAR: "공포",
  COMEDY: "코메디",
  FANTASY: "판타지",
  HISTORY: "역사",
  ACTION: "액션",
  WAR: "전쟁",
  SF: "SF",
  ADVANTURE: "어드벤처",
  ROMANCE: "멜로/로맨스",
  MUSICAL: "뮤지컬",
  CRIME: "범죄",
  THRILLER: "스릴러",
};

export const getGenreVO = () => {
  const genreList = [];
  for (const key in genreObj) {
    genreList.push({ key: [key], value: genreObj[key] });
  }
  return genreList;
};
