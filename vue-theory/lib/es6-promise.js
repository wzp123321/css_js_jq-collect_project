const STATE = {
    PENDING = 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

export class myPromise {
    constructor(excutor) {
        // 状态
        this.state = STATE.PENDING;
        // 返回值
        this.value = null;
        // 回调函数数组
        this.callbacks = [];
        // resolve方法
        this.resolve = function (value) {
            if (this.state != STATE.PENDING) {
                return;
            }
            this.value = value;
            this.state = STATE.RESOLVED;
            setTimeout(() => {
                if (this.callbacks.length) {
                    this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolved(value);
                    })
                }
            })
        }
        // reject方法
        this.reject = function (value) {
            if (this.state != STATE.PENDING) {
                return;
            }
            this.value = value;
            this.state = STATE.REJECTED;
            setTimeout(() => {
                if (this.callbacks.length) {
                    this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(value);
                    })
                }
            })
        }
        try {
            excutor(resolve, reject)
        } catch (error) {
            console.log(error)
        }
    }
    // then方法
    then = function (onResolved, onRejected) {
        onResolved = typeof onResolved !== 'function' ? (value) => value : onResolved
        onRejected = typeof onRejected !== 'function' ? (reason) => {
            throw reason
        } : onRejected;
        const self = this;

        return new Promise((resolve, reject) => {
            function handler(fn) {
                try {
                    const result = fn(self.data);
                    if (result instanceof myPromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            switch (self.state) {
                case STATE.PENDING:
                    self.callbacks.push({
                        onResolved() {
                            handler(onResolved);
                        },
                        onRejected() {
                            handler(onRejected);
                        }
                    })
                    break;
                case STATE.RESOLVED:
                    setTimeout(() => {
                        handler(onResolved)
                    })
                    break;
                case STATE.REJECTED:
                    setTimeout(() => {
                        handler(onRejected)
                    })
                    break;
            }
        })
    }
    // catch方法
    catch = function (onRejected) {
        return this.then(undefined, onRejected);
    }
    // resolve方法
    resolve = function () {}
    // reject 方法
    reject = function () {}
    // all方法
    all = function () {}
    // rise方法
    rase = function () {}
}