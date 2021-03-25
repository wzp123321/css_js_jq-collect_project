// loader本质上是一个函数

module.exports = function (content, map, meta) {
    console.log('33333333333');

    return content
}

module.exports.pitch = function(){
    console.log('pitch33333333333')
}