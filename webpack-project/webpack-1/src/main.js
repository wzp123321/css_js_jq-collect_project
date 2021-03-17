/**
 * 入口文件main.js   webpack打包会从这个入口开始打包
 */

/**
 * 打包命令
 *      本地打包：webpack  ./src/main.js -o ./build --mode=development
 *              webpack会./src/main.js为入口 打包后输出到build文件夹下
 *       生产打包：webpack  ./src/main.js -o ./build --mode=production
 * 
 * 
 *  总结：
 *      1.webpack能够处理js/json文件，但是不能处理css/img等资源
 *      2.生产环境和测试环境将es6模块化编译成浏览器能够识别的模块化
 *      3.生产环境比测试环境多了一个压缩js代码
 */
import json from "../assets/data.json";
console.log("我是入口文件main.js", json);
