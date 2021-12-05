const myPromise = require('../myPromiseFully');

/**
 * 验证Promise.all()方法
 */

 const promise1 = myPromise.resolve(3);
 const promise2 = 42;
 const promise3 = new myPromise((resolve, reject) => {
   setTimeout(resolve, 100, 'foo');
 });
 
 myPromise.all([promise1, promise2, promise3]).then((values) => {
   console.log(values);
 });

var p1 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one');
});
var p2 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two');
});
var p3 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three');
});
var p4 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four');
});
var p5 = new myPromise((resolve, reject) => {
    reject('reject');
});

myPromise.all([p1, p2, p3, p4, p5]).then(values => {
    console.log(values);
}, reason => {
    console.log(reason)
});

//From console:
//"reject"