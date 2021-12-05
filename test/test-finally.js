const myPromise = require('../myPromiseFully');

/**
 * 验证Promise.prototype.finally()方法
 */


let p1 = new Promise(function (resolve, reject) {
    resolve(1)
}).then(function (value) {
    console.log(value);
}).catch(function (e) {
    console.log(e); // 不会执行
}).finally(function () {
    console.log('finally');
});

let myp1 = new myPromise(function (resolve, reject) {
    resolve(1)
}).then(function (value) {
    console.log(value);
}).catch(function (e) {
    console.log(e); // 不会执行
}).finally(function () {
    console.log('finally');
});

let myp2 = new myPromise(function (resolve, reject) {
    reject(1)
}).then(function (value) {
    console.log(value);
}).catch(function (e) {
    console.log(e); // 不会执行
}).finally(function () {
    console.log('finally');
});