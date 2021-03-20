const { resolve } = require("path");

// 引入加载html的插件
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 出口
  output: {
    filename: "build.js",
    // __dirname是nodejs的一个变量  是当前配置文件的绝对路径
    path: resolve(__dirname, "build"),
  },
  //
  module: {
    // 加载不同文件   test：正则匹配   use：使用不同loader
    rules: [
      {
        test: /\.css/,
        // use是自右向左加载
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  // 插件
  plugins: [new htmlWebpackPlugin({
      template:'./src/index.html'
  })],
  //
  devServer: {
    port: 9999,
  },
  // 模式  测试&生产
  mode: "development",
};
