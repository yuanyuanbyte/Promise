const myPromise = require('../myPromiseFully');

/**
 * 验证Promise.any()方法
 */

// console.log(new AggregateError('All promises were rejected'));

myPromise.any([]).catch(e => {
    console.log(e);
});

const pErr = new Promise((resolve, reject) => {
    reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
    console.log(value);
    // 期望输出: "很快完成"
})


const pErr1 = new myPromise((resolve, reject) => {
    reject("总是失败");
});

const pErr2 = new myPromise((resolve, reject) => {
    reject("总是失败");
});

const pErr3 = new myPromise((resolve, reject) => {
    reject("总是失败");
});

myPromise.any([pErr1, pErr2, pErr3]).catch(e => {
    console.log(e);
    for (let item in e) {
        debugger
        console.log(item + ':' + obj[pro])
    }
})
/* 
[[PromiseState]]: "rejected"
[[PromiseResult]]: AggregateError: All promises were rejected
errors: Array(3)
0: "总是失败"
1: "总是失败"
2: "总是失败"
*/