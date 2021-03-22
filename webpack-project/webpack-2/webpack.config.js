const { resolve } = require("path");

// html加载器
const htmlWebpackPlugin = require("html-webpack-plugin");
// 将css单独打包成一个文件
const miniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  // 入口文件
  entry: "./src/main.js",
  // 打包出口
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "built"),
  },
  module: {
    // test:正则匹配    exclude：除了xxx
    rules: [
      {
        test: /\.css/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          /**
           * 兼容性处理 postcss--------------postcss-loader  postcss-preset-env
           *
           * 帮助postcss找到package.json中的browserslist里的配置，通过配置加载指定的css兼容性样式
           *
           * 修改loader的配置
           */
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     ident: "postcss",
          //     plugins: [require("postcss-preset-env")()],
          //   },
          // },
        ],
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          // 配置image打包文件夹
          outputPath: "imgs",
        },
      },
    ],
  },
  plugins: [
    // 配置html位置
    new htmlWebpackPlugin({
      template: "./public/index.html",
      // 通过配置压缩html
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // css
    new miniCssExtractPlugin({
      filename: "css/main.css",
    }),
    // 压缩css插件
    new optimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "built"),
    host: "127.0.0.1",
    compress: true,
    port: 9999,
    open: true,
    hot: true, // 开启热更新
  },
};
