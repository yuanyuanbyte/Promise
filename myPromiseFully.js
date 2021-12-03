/**
 * 在 myPromise.js 基础上，根据规范实现了 Promise 的全部方法：
 * - Promise.resolve()
 * - Promise.reject()
 * - Promise.prototype.catch()
 * - Promise.prototype.finally()
 * - Promise.all()
 * - Promise.allSettled()
 * - Promise.any()
 * - Promise.race()
 */
class myPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(func) {
        this.PromiseState = myPromise.PENDING;
        this.PromiseResult = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        if (this.PromiseState === myPromise.PENDING) {
            setTimeout(() => {
                this.PromiseState = myPromise.FULFILLED;
                this.PromiseResult = result;
                this.onFulfilledCallbacks.forEach(callback => {
                    callback(result)
                })
            });
        }
    }

    reject(reason) {
        if (this.PromiseState === myPromise.PENDING) {
            setTimeout(() => {
                this.PromiseState = myPromise.REJECTED;
                this.PromiseResult = reason;
                this.onRejectedCallbacks.forEach(callback => {
                    callback(reason)
                })
            });
        }
    }

    /**
     * [注册fulfilled状态/rejected状态对应的回调函数] 
     * @param {function} onFulfilled  fulfilled状态时 执行的函数
     * @param {function} onRejected  rejected状态时 执行的函数 
     * @returns {function} newPromsie  返回一个新的promise对象
     */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };

        let promise2 = new myPromise((resolve, reject) => {
            if (this.PromiseState === myPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (this.PromiseState === myPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                });
            } else if (this.PromiseState === myPromise.PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.PromiseResult);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.PromiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        })

        return promise2
    }

    /**
     * Promise.resolve()
     * @param {[type]} value 要解析为 Promise 对象的值 
     */
    static resolve(value) {
        // 如果这个值是一个 promise ，那么将返回这个 promise 
        if (value instanceof myPromise) {
            return value;
        } else if (value instanceof Object && 'then' in value) {
            // 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
            return new myPromise((resolve, reject) => {
                value.then(resolve, reject);
            })
        }

        // 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)
        return new myPromise((resolve) => {
            resolve(value)
        })
    }

    /**
     * Promise.reject()
     * @param {*} reason 表示Promise被拒绝的原因
     * @returns 
     */
    static reject(reason) {
        return new myPromise((resolve, reject) => {
            reject(reason);
        })
    }

    /**
     * Promise.prototype.catch()
     * @param {*} onRejected 
     * @returns 
     */
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * Promise.prototype.finally()
     * @param {*} callBack 无论结果是fulfilled或者是rejected，都会执行的回调函数
     * @returns 
     */
    finally(callBack) {
        return this.then(callBack, callBack)
    }

    /**
     * Promise.all()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    static all(promises) {
        return new myPromise((resolve, reject) => {
            // 参数校验
            if (Array.isArray(promises)) {
                let result = []; // 存储结果
                let count = 0; // 计数器

                // 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
                if (promises.length === 0) {
                    return resolve(promises);
                }

                promises.forEach((item, index) => {
                    //  判断参数是否为promise
                    if (item instanceof myPromise) {
                        myPromise.resolve(item).then(
                            value => {
                                count++;
                                // 每个promise执行的结果存储在result中
                                result[index] = value;
                                // Promise.all 等待所有都完成（或第一个失败）
                                count === promises.length && resolve(result);
                            },
                            reason => {
                                /**
                                 * 如果传入的 promise 中有一个失败（rejected），
                                 * Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成
                                 */
                                reject(reason);
                            }
                        )
                    } else {
                        // 参数里中非Promise值，原样返回在数组里
                        count++;
                        result[index] = item;
                        count === promises.length && resolve(result);
                    }
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }

    /**
     * Promise.allSettled()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            // 参数校验
            if (Array.isArray(promises)) {
                let result = []; // 存储结果
                let count = 0; // 计数器

                // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
                if (promises.length === 0) return resolve(promises);

                promises.forEach((item, index) => {
                    // 非promise值，通过Promise.resolve转换为promise进行统一处理
                    myPromise.resolve(item).then(
                        value => {
                            count++;
                            // 对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。
                            result[index] = {
                                status: 'fulfilled',
                                value
                            }
                            // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
                            count === promises.length && resolve(result);
                        },
                        reason => {
                            count++;
                            /**
                             * 对于每个结果对象，都有一个 status 字符串。如果值为 rejected，则存在一个 reason 。
                             * value（或 reason ）反映了每个 promise 决议（或拒绝）的值。
                             */
                            result[index] = {
                                status: 'rejected',
                                reason
                            }
                            // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
                            count === promises.length && resolve(result);
                        }
                    )
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }

    /**
     * Promise.any()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    static any(promises) {
        return new myPromise((resolve, reject) => {
            // 参数校验
            if (Array.isArray(promises)) {
                let errors = []; // 
                let count = 0; // 计数器

                // 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
                if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));

                promises.forEach(item => {
                    // 非Promise值，通过Promise.resolve转换为Promise
                    myPromise.resolve(item).then(
                        value => {
                            // 只要其中的一个 promise 成功，就返回那个已经成功的 promise 
                            resolve(value);
                        },
                        reason => {
                            count++;
                            errors.push(reason);
                            /**
                             * 如果可迭代对象中没有一个 promise 成功，就返回一个失败的 promise 和AggregateError类型的实例，
                             * AggregateError是 Error 的一个子类，用于把单一的错误集合在一起。
                             */
                            count === promises.length && reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    )
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (x instanceof myPromise) {
        if (x.PromiseState === myPromise.PENDING) {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reject);
        } else if (x.PromiseState === myPromise.FULFILLED) {
            resolve(x.PromiseResult);
        } else if (x.PromiseState === myPromise.REJECTED) {
            reject(x.PromiseResult);
        }
    } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
        try {
            var then = x.then;
        } catch (e) {
            return reject(e);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (e) {
                if (called) return;
                called = true;

                reject(e);
            }
        } else {
            resolve(x);
        }
    } else {
        return resolve(x);
    }
}

myPromise.deferred = function () {
    let result = {};
    result.promise = new myPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

module.exports = myPromise;