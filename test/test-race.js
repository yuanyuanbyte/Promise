const myPromise = require('../myPromiseFully');

/**
 * 验证Promise.race()方法
 */

// 数组全是非Promise值，测试通过
let p1 = myPromise.race([1, 3, 4]);
setTimeout(() => {
    console.log('p1 :>> ', p1);
});

// 空数组，测试通过
let p2 = myPromise.race([]);
setTimeout(() => {
    console.log('p2 :>> ', p2);
});

const p11 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const p22 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

// // 数组里有非Promise值，测试通过
myPromise.race([p11, p22, 10]).then((value) => {
    console.log('p3 :>> ', value);
    // Both resolve, but p22 is faster
});
// expected output: 10

// 数组里有'已解决的Promise' 和 非Promise值 测试通过
let p12 = myPromise.resolve('已解决的Promise')
setTimeout(() => {
    myPromise.race([p12, p22, 10]).then((value) => {
        console.log('p4 :>> ', value);
    });
    // expected output:已解决的Promise
});

// Promise.race的一般情况 测试通过
const p13 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const p14 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

myPromise.race([p13, p14]).then((value) => {
    console.log('p5 :>> ', value);
    // Both resolve, but promise2 is faster
});
// expected output: "two"