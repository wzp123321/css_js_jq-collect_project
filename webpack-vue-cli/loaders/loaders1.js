// loader本质上是一个函数

module.exports = function (content, map, meta) {
    console.log('111111111');

    return content
}

module.exports.pitch = function(){
    console.log('pitch11111111111')
}