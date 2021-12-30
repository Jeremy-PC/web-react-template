// merge
const { merge } = require("webpack-merge");
// baseConfig
const { baseConfig, resolvePath, pageNames } = require("./webpack.base.conf");
// 错误提示
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const
const configuration = {
  host: process.env.HOST || "localhost",
  port: 8002,
};
const getProxy = (pageNames, configuration) => {
  const proxy = {};
  pageNames.forEach((item) => {
    proxy[item] = {
      target: `http://${configuration.host}:${configuration.port}/view`,
      pathRewrite: { [`^${item}`]: `${item}.html` },
    };
  });
  return proxy;
};

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    ...configuration,
    static: [{ directory: resolvePath("app/public/") }],
    open: ["/index"],
    proxy: getProxy(pageNames, configuration),
    compress: true,
    liveReload: true,
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
});
