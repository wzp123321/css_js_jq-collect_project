/**
 * es5语法实现promise 绑定到window对象上
 */
(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
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
        setTimeout(() => {
          self.callbacks.forEach((callbacksObj) => {
            callbacksObj.onResolved(value);
          });
        });
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
          self.callbacks.forEach((callbacksObj) => {
            callbacksObj.onRejected(value);
          });
        });
      }
    }

    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * then
   * 指定成功和失败的回调函数
   * 返回值是一个新的promise对象
   *
   * onResolved, onRejected  是异步调用的
   */
  // https://www.bilibili.com/video/BV1MJ41197Eu?p=23&spm_id_from=pageDriver
  Promise.prototype.then = function (onResolved, onRejected) {
    // 判断onResolved, onRejected是否为函数  需要做好异常处理
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const self = this;
    return new Promise((resolve, reject) => {
      /**
       * 根据回调函数执行结果返回promise对象
       * 结果为非promise对象-----------成功回调 回调结果为onResolved的结果
       * 如果为promise 返回一个新的promise
       *
       * @param fn 执行函数
       */
      function handler(fn) {
        try {
          const result = fn(self.data);
          if (result instanceof Promise) {
            //   怎么返回promise对象?   then
            // result.then(
            //     value=>resolve(value),
            //     error=>reject(error)
            // );
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }
      switch (self.status) {
        case PENDING:
          // 执行回调函数 还需要改变promise状态
          self.callbacks.push({
            onResolved() {
              handler(onResolved);
            },
            onRejected() {
              handler(onRejected);
            },
          });
          break;
        case RESOLVED:
          setTimeout(() => {
            handler(onResolved);
          });
          break;
        case REJECTED:
          setTimeout(() => {
            handler(onRejected);
          });
          break;
      }
    });
  };
  /**
   * catch
   * 指定失败的回调函数
   * 返回值是一个新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };
  /**
   * resolve
   * @param {*} value
   * @returns
   */
  Promise.resolve = function (value) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };
  /**
   * reject
   * @param {*} value
   * @returns
   */
  Promise.reject = function (value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  };
  /**
   * all
   * 返回值是一个新的promise对象
   * 当所有promise都成功才成功 有一个失败就失败
   */
  Promise.all = function (promiseList) {
    let successCount = 0;
    let resolveList = [];
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        //   防止item不是promise
        Promise.resolve(item).then(
          (value) => {
            // 所有的成功才算成功
            successCount += 1;
            resolveList[index] = value;
            if (resolveList.length === successCount) {
              resolve(resolveList);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };
  /**
   * race
   * 返回值是一个promise对象  看第一个是否成功
   */
  Promise.race = function (promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        //   防止item不是promise
        Promise.resolve(item).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  // 向外暴露
  window.Promise = Promise;
})(window);
