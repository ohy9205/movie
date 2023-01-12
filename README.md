# Movyes 영화 정보 플랫폼

## 📃요약

- 영화의 기본 정보(줄거리, 상영시간 등)를 확인할 수 있습니다.
- 관심있는 영화는 모아서 확인할 수 있습니다.
- 게시판을 통해 다른 유저들과 소통이 가능한 커뮤니티 사이트입니다.

## ✔기능

- [x] 로그인/회원가입
- [x] 영화 검색
- [x] 영화 상세 정보 조회
- [x] 'Pick함'에 영화 추가, 제거
- [x] 'Pick함'에서 리스트 조회
- [x] 게시판 CRUD

## 🛠사용 기술 및 라이브러리

`React` `html` `css` `javascript` `css moudle` `redux-toolkit`

`firebase auth, realtime database, storage`

### 사용 API

[KMDb](https://www.kmdb.or.kr/info/api/apiDetail/6) : 영화 상세 정보

[영화 진흥 위원회](https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do?serviceId=searchDailyBoxOffice) : 박스오피스 목록(string데이터만)

# 🌈Features

## 1. 프로젝트 구조

```jsx
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂ui
 ┣ 📂pages
 ┣ 📂store
 ┣ 📂util
```

- `api`: API 관련 모음
- `components` : 컴포넌트 모음
- `ui` : 공통style을 위한 box컴포넌트나 html요소 컴포넌트
- `pages` : 라우팅 페이지
- `store` : context, redux 등 state관련 파일
- `util` : 데이터 포맷 등 부가적인 기능

## 2. DB에 영화 데이터 저장

- 웹에서 검색, 조회되는 영화 데이터는 모두 DB에 저장됩니다.
- `changeDataFormat` 메소드를 만들어 API로부터 받은 응답 데이터 중 필요한 데이터만 골라냅니다.
- 정규표현식을 사용해서 영화 제목에 포함된 불필요한 공백이나 글자를 제거합니다.

## 3. 영화 조회

- 박스 오피스, 최신 개봉, 랜덤, 검색 결과를 조회할 수 있습니다.
- 박스 오피스는
  1. 영화진흥위원회 API로 박스오피스 목록을 받아오고
  2. 받은 목록의 영화를 각각 KMDb API에서 검색 합니다.
     그렇기 때문에 과도한 KMDb API 호출을 방지하기 위해 DB에 해당 영화가 있는지 먼저 검색하고 없는 경우에만 API를 호출하도록 했습니다.
- 랜덤 영화는 `shuffle` 함수를 만들어 배열의 순서를 섞어주었습니다.
- 검색결과에 성인물은 노출되지 않도록 필터링 했습니다.
- 포스터가 없는 경우 `/public/assets` 경로에 있는 대체 이미지가 보여집니다.
- 상세정보가 조회되는 모달창은 `Portal`을 이용해서 DOM 외부에 렌더링되게 했습니다.

## 4. ‘Pick’한 영화

- 웹 페이지에 접속하면 최상단 컴포넌트에서 DB로부터 ‘pick’ 데이터를 받아와 리덕스에 저장합니다.
- `Header` 컴포넌트에서는 리덕스에 저장된 데이터를 이용해서 pick 데이터의 갯수를 출력합니다.
- `PickIcon` 컴포넌트에서는 영화 정보를 조회할 때 해당 영화가 pick리스트에 포함되어 있는지 확인하고, 데이터가 있다면 `isPick` state를 `true`로 변경합니다. `isPick` 값에 따라 아이콘이 다르게 나타납니다.

## 5. 커뮤니티(게시판)

- 파일 첨부 input의 `accept='image/*'` 속성으로 이미지 파일만 첨부할 수 있습니다.
- 이미지를 첨부하면 `FileReader` 를 사용해서 이미지 정보를 읽습니다.
- 이미지 저장을 위해 firesotre의 `sotrage` 기능을 사용했습니다.
- 게시글 삭제, 이미지 삭제 시 `storag` 에 저장된 이미지 데이터도 함께 삭제됩니다.
- 수정, 삭제 모달창은 `Portal`을 이용해서 DOM 외부에 렌더링되게 했습니다.
- 이미지를 클릭하면 원본 이미지가 나타납니다.

## 6. 사용자 로그인/인증

- `isLogin` props로 로그인 페이지와 회원가입 페이지를 구분합니다.
- 로그인/회원가입에 실패하면 사용자 피드백이 출력됩니다.
- 로그인하지 않으면 웹 서비스를 이용할 수 없도록 각 페이지 컴포넌트에 `ProtectedRoute` 컴포넌트를 씌워주었습니다.
- `ProtectedRoute` 에서는 user 정보가 있으면 요청한 도메인 페이지로 이동하고, 없으면 반드시 로그인 페이지로 이동합니다.
- user 정보는 `context` 에서 관리합니다
- firebase의 `setPsersistence` 를 사용해서 user인증 지속 시간을 세션으로 설정하였습니다.

# 발견된 문제 및 개선 필요 사항

- ~~로그인 성공 시 메인 페이지로 이동하지 않음~~
  > ~~원인) 로그인 바로 직후에 유저 정보가 undefined가 아닌 null로 들어옴.~~
  > 2023.01.13 해결 (d0533c2)
- ~~게시글 리스트에서 영어 게시글은 textarea를 벗어남~~ 2023.01.12 해결
- ~~메인 페이지에서 캐러셀 크기로 인해 UI가 뒤틀리는 현상~~ 2023.01.12 해결
- 박스오피스 데이터 패칭 방식 변화 필요
- API코드 리팩토링 필요
- 데이터 캐싱처리 필요
- pick페이지에서 리스트가 추가 순서대로 정렬 안됨
  > 원인) pick데이터에 정렬 기준 값이 없음
- 배포 페이지에서 새로고침하면 404에러 발생
  > 원인) gh-page는 SPA 지원하지 않음

# 추가 기능 예정

- 소셜 로그인
- 커뮤니티 댓글
- 영화 리뷰 작성

---

# 개발기 보러가기

https://velog.io/@ohy9205/project-Movyes-%EC%98%81%ED%99%94-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9B%84%EA%B8%B0#%EA%B8%B0%EB%8A%A5
