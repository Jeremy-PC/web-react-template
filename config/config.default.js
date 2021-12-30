// const
const path = require("path");
// 开启中间件
exports.middleware = ["huyaoa"];
exports.huyaoa = {
  exclude: ["^\\/authorization", "^\\/api\\/.*"],
};
// cookie加密key
exports.keys = "my-cookie-secret-key";
// 模板引擎地址
exports.view = {
  defaultViewEngine: "nunjucks",
  mapping: { ".html": "nunjucks" },
  root: [path.join(__dirname, "../app/public/view/")].join(","),
};
// 静态文件地址
exports.static = {
  maxAge: 31536000,
  prefix: "/",
  dir: [path.join(__dirname, "../app/public/")],
};
// 安全模块
exports.security = {
  csrf: false,
};
// http请求超时设置
exports.httpProxy = {
  timeout: 60 * 1000,
};
// 设置允许本地开发的localhost:8002地址跨域请求
exports.cors = {
  origin: "http://localhost:8002",
  credentials: true,
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
};
