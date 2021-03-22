#### webpack性能优化


#### 开发环境
* 优化打包构建速度
* 优化代码调试
    * source-map

#### 生产环境
* 优化打包构建速度
    * oneOf
    * babel缓存（优化打包速度）
    * 多进程打包（可以优化打包速度，针对消耗时间比较长的任务）
    * externals 不打包第三方库
    * dll 单独打包引用即可
* 优化代码运行的性能
    * hash 
    * chunkHash 是否来自同一个chunk
    * contentHash 根据文件内容生成hash