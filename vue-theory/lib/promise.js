/**
 * es5语法实现promise 绑定到window对象上
 */
(function (window) {
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';
    // 执行器函数 同步执行
    function Promise(excutor) {
        // 指定this
        const self = this;
        // 状态 pending  resolved  rejected
        self.status = PENDING;
        // 返回结果
        self.data = undefined;
        // 回调函数
        self.callbacks = [];
        // 成功回调函数
        function resolve(value) {
            // 状态只能修改一次
            if (self.status !== PENDING) return;
            // 修改状态
            self.status = RESOLVED;
            // 赋值
            self.data = value;
            // 异步执行成功回调
            if (self.callbacks.length > 0) {
                console.log(12)
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        console.log(value)
                        callbacksObj.onResolved(value);
                    })
                })
            }
        }
        // 失败回调函数
        function reject(value) {
            // 状态只能修改一次
            if (self.status !== PENDING) return;
            // 修改状态
            self.status = REJECTED;
            // 赋值
            self.data = value;
            // 异步执行成功回调
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(value);
                    })
                })
            }
        }

        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * then
     * 指定成功和失败的回调函数
     * 返回值是一个新的promise对象
     */
    // https://www.bilibili.com/video/BV1MJ41197Eu?p=23&spm_id_from=pageDriver
    Promise.prototype.then = function (onResolved, onRejected) {
        const self = this;
        self.callbacks.push({
            onResolved,
            onRejected
        })
    }
    /**
     * catch
     * 指定失败的回调函数
     * 返回值是一个新的promise对象
     */
    Promise.prototype.catch = function (onRejected) {}
    /**
     * all
     * 返回值是一个新的promise对象
     * 当所有promise都成功才成功 有一个失败就失败
     */
    Promise.prototype.all = function (promiseList) {}
    /**
     * race
     * 返回值是一个promise对象  看第一个是否成功
     */
    Promise.prototype.race = function (promiseList) {}


    // 向外暴露
    window.Promise = Promise;
})(window)