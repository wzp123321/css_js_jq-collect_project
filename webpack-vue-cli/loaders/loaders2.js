// loader本质上是一个函数

module.exports = function (content, map, meta) {
    console.log('222222222');

    return content
}

module.exports.pitch = function(){
    console.log('pitch222222222')
}