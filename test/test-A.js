const myPromise = require('../myPromiseFully');

/**
 * 验证Promise传入的两个参数，即resolve和reject可以换成其他参数，只需要参数和使用一直即可
 */
let p1 = new myPromise((a, b) => {
    a(1)
})

setTimeout(() => {
    console.log(p1);
}, 1000);