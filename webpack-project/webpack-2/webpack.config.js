const { resolve } = require("path");

// html加载器
const htmlWebpackPlugin = require("html-webpack-plugin");
// 将css单独打包成一个文件
const miniCssExtractPlugin= require('mini-css-extract-plugin');
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
        use: [miniCssExtractPlugin.loader, "css-loader"],
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
    }),
    // css
    new miniCssExtractPlugin({
        filename:'css/main.css'
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "built"),
    host: "127.0.0.1",
    compress: true,
    port: 9999,
    open: true,
  },
};
