// nodejs api resolve
const { resolve } = require("path");
// 加载html 插件
const htmlWebpackPlugin = require("html-webpack-plugin");
// 压缩css
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
/**
 * source-map   提供源代码到构建后代码映射技术（如果代码出错可以在控制台看到报错位置）
 */

/**
 * 缓存
 */

/**
 * tree shaking 去除无用代码
 *     前提：1.必须使用ES6模块化，2.开启production
 * 作用：减小代码体积
 */
module.exports = {
  /**
   * 入口
   *  字符串/数组/对象
   */
  entry: "./src/main.js",
  // 出口
  output: {
    filename: "js/[name]/build.[hash:12].js",
    path: resolve(__dirname, "build"),
    // 所有资源引入的公共前缀名
    publicPath: "/",
    // 非入口chunk的名称
    chunkFilename: "[name]_chunk.js",
    library: "main", // 整个库对外报暴露的变量名
    libraryTarget: "window", // 变量添加到哪个变量上  这里window表示 window.main即可访问这个库
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      // less
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 图片
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          output: "images", // 配置图片打包位置
          limit: 10 * 1024, // 限制10kb大小一下图片使用base64
        },
      },
    ],
  },
  devServer: {
    port: 9898, // 端口
    contentBase: resolve(__dirname, "build"), // 目录
    host: "localhost",
    open: true, // 自动打开浏览器
    hot: true, // 热更新
  },
  plugins: [
    /// 配置html入口
    new htmlWebpackPlugin({
      template: "./public/index.html",
      // html压缩
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // css
    new miniCssExtractPlugin({
      filename: "css/main.[hash:12].css",
    }),
    // 压缩css
    new optimizeCssAssetsWebpackPlugin(),
  ],
  /**
   * 可以将node_modules单独打包成一个chunk
   * 自动分析多入口chunk中，有没有公共文件，如果有会打包成单独的一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // 配置解析的规则
  resolve: {
    alias: {
      $src: resolve(__dirname, "src"),
    },
  },
  mode: "development",
};
