/**
 * es5语法实现promise 绑定到window对象上
 */
(function (window) {
    function Promise(extructor) {
        // 状态 pending  resolved  rejected
        this.status = 'pending';
        // 返回结果
        this.data = undefined;
        // 回调函数
        this.callbacks = [];

        function resolve(value) {
            // 状态只能修改一次
            if (this.status !== 'pengding') return;
            // 修改状态
            this.status = 'rejected';
            // 赋值
            this.data = value;
            // 异步执行成功回调
            setTimeout(() => {
                if (this.callbacks.length > 0) {
                    this.callbacks.forEach(callbackObj => {
                        console.log(value)
                        callbackObj.onResolved(value);
                    })
                }
            })
        }


        function reject(value) {
            // 状态只能修改一次
            if (this.status !== 'pengding') return;
            // 修改状态
            this.status = 'rejected';
            // 赋值
            this.data = value;
            // 异步执行成功回调
            setTimeout(() => {
                if (this.callbacks.length > 0) {
                    this.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(value);
                    })
                }
            })
        }

        try {
            extructor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * then
     */
    Promise.prototype.then = function (onResolved, onRejected) {}
    // https://www.bilibili.com/video/BV1MJ41197Eu?p=23&spm_id_from=pageDriver
    /**
     * catch
     */
    Promise.prototype.catch = function (onRejected) {}
    /**
     * all
     */
    Promise.prototype.all = function (promiseList) {}
    /**
     * race
     */
    Promise.prototype.race = function (promiseList) {}

    window.Promise = Promise;
})(window)