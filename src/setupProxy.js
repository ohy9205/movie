const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/search_json2.jsp",
    createProxyMiddleware({
      target: "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api",
      changeOrigin: true,
    })
  );
  app.use(
    "/searchDailyBoxOfficeList.json",
    createProxyMiddleware({
      target: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice",
      changeOrigin: true,
    })
  );
};
