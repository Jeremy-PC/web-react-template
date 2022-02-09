const path = require("path");
const webpack = require("webpack");
// 多页应用
const glob = require("glob");
// 模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// css代码打包分离和优化
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// js代码打包分离和优化
const TerserPlugin = require("terser-webpack-plugin");
// 根据相对路径获取绝对路径
const resolvePath = (relativePath) =>
  path.resolve(__dirname, `../${relativePath}`);
// NODE_ENV
const NODE_ENV = process.env.NODE_ENV;
// 动态获取多页应用的入口和html
const getMultiPageApplication = (titleOptions) => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const pageNames = [];
  const entryFiles = glob.sync(resolvePath("src/template/*/index.jsx"));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/template\/(.*)\/index\.jsx/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    pageNames.push(`/${pageName}`);
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: titleOptions[pageName] || "HTML页面",
        template: resolvePath(`src/template/${pageName}/index.html`),
        filename: `view/${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return { entry, htmlWebpackPlugins, pageNames };
};
const { entry, htmlWebpackPlugins, pageNames } = getMultiPageApplication({
  index: "首页",
  authorization: "授权页",
});

const baseConfig = {
  entry,
  devtool:
    NODE_ENV === "production" ? "hidden-source-map" : "inline-source-map",
  output: {
    path: resolvePath("app/public/"),
    filename: "js/[name].[contenthash:8].js",
    assetModuleFilename: "assets/[name].[hash:8][ext]",
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less"],
    alias: {
      "@page": resolvePath("src/page"),
      "@components": resolvePath("src/components"),
      "@lib": resolvePath("src/lib"),
      "@store": resolvePath("src/store"),
      "@layout": resolvePath("src/layout"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:12]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash:8].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash:8].css`,
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      process_env_NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 使用多进程并发运行以提高构建速度
        extractComments: false, //不将注释提取到单独的文件中
      }),
      new CssMinimizerPlugin({
        parallel: true, // 使用多进程并发运行以提高构建速度
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxSize: NODE_ENV === "production" ? 50000 : 500000, //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1, //模块至少使用次数
      maxAsyncRequests: 5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3, //首页加载的时候引入的文件最多3个
      automaticNameDelimiter: "~", //缓存组和生成文件名称之间的连接符
      cacheGroups: {
        commons: {
          name: "vendors",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  // 性能提示
  performance: {
    maxEntrypointSize: 10240000,
    maxAssetSize: 10240000,
    hints: false,
  },
};

module.exports = { resolvePath, baseConfig, pageNames };
