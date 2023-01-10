# :money_with_wings: 월간 가계부 프로젝트
- 영화 정보를 얻을 수 있고 다른 유저들과 소통할 수 있는 웹 사이트입니다.
- 관심있는 영화는 모아서 확인할 수 있습니다. 
- 게시판을 통해 다른 유저들과 소통이 가능한 커뮤니티 사이트입니다.

> 배포링크

## 기능
- 로그인/회원가입
- 영화 검색
- 영화 상세 정보 조회
- 'Pick함'에 영화 추가
- 'Pick함'에서 리스트 조회
- 게시판 CRUD

## 사용 기술 및 라이브러리
html, css, javascript
css moudle
React.js
Create-React-App
react-router-dom
react-query
redux-toolkit
react-icons
firebase auth, realtime database, storage

## 폴더 구조
```
📦src
 ┣ 📂api 
 ┣ 📂components	
 ┃ ┣ 📂ui 
 ┣ 📂pages 
 ┣ 📂store 
 ┣ 📂util 
 ```
- api : API 관련 모음
- components: 컴포넌트 모음
- ui : 공통style을 위한 box컴포넌트나 html요소 컴포넌트 
- store : context, redux 등 state관리
- store : 애플리케이션 공통 데이터 모음
- util : 데이터 포맷 등 부가적인 기능을 수행하는 메소드

## 사용
사전조건: friebase API사용에 필요한 configure설정 정보가 필
```js
npm install
npm start
```

## 회고
자세한 개발기는 블로그에서 확인 가능합니다.
https://velog.io/@ohy9205/project-Movyes-%EC%98%81%ED%99%94-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A4%80%EB%B9%84
