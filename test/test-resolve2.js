const myPromise = require('../myPromiseFully');

/**
 * 验证Promise.resolve()方法
 */

let myp1 = myPromise.resolve('Success');
console.log('myp1 :>> ', myp1);

let p1 = Promise.resolve('success');
console.log('p1 :>> ', p1);