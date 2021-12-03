const myPromise = require('./myPromiseFully')

/**
 * 测试Promise功能
 */

// let p1 = new myPromise(function (resolve, reject) {
//     resolve(1)
// }).then(function (value) {
//     console.log(value);
// }).catch(function (e) {
//     console.log(e);
// }).finally(function () {
//     console.log('finally');
// });



// myPromise.reject(new Error('fail')).then(function () {
//     // not called
// }, function (error) {
//     console.error(error); // Error: fail
// });


// var p1 = new myPromise(function (resolve, reject) {
//     resolve('Success');
// });

// p1.then(function (value) {
//     console.log(value); // "Success!"
//     throw 'oh, no!';
// }).catch(function (e) {
//     console.log(e); // "oh, no!"
// }).then(function () {
//     console.log('after a catch the chain is restored');
// }, function () {
//     console.log('Not fired due to the catch');
// });

// // 以下行为与上述相同
// p1.then(function (value) {
//     console.log(value); // "Success!"
//     return Promise.reject('oh, no!');
// }).catch(function (e) {
//     console.log(e); // "oh, no!"
// }).then(function () {
//     console.log('after a catch the chain is restored');
// }, function () {
//     console.log('Not fired due to the catch');
// });

// // 捕获异常
// const p2 = new myPromise(function (resolve, reject) {
//     throw new Error('test');
// });
// p2.catch(function (error) {
//     console.log(error);
// });
// // Error: test

// setTimeout(() => {
//     console.log('----------Promise.resolve()-------------');
//     const promise1 = Promise.resolve(123);

//     promise1.then((value) => {
//         console.log(value);
//         // expected output: 123
//     });

//     console.log('promise1', promise1);
// }, 1000);

// setTimeout(() => {
//     console.log('----------myPromise.resolve()-------------');
//     const promise1 = myPromise.resolve(123);

//     // 打印promise1的状态，测试myPromise.resolve()方法
//     setTimeout(() => {
//         /**
//          * 为什么打印promise1的状态需要添加定时器？
//          * 因为promise是微任务，console.log会在promise前执行，
//          * 此时log获取到的promise1状态还没有改变
//          * 想要正确的获取promise1状态，就要在promise1执行完毕后获取
//          */
//         console.log('promise1', promise1);
//     }, 1000);

//     promise1.then((value) => {
//         console.log(value);
//         // expected output: 123
//     });
//     console.log('promise1', promise1);
// }, 1000);

// setTimeout(() => {
//     console.log('------Resolve一个thenable对象---------');
//     // Resolve一个thenable对象
//     var p1 = myPromise.resolve({
//         then: function (onFulfill, onReject) {
//             onFulfill("fulfilled!");
//         }
//     });
//     console.log(p1 instanceof myPromise) // true, 这是一个Promise对象
// }, 1000);