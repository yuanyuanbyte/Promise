const myPromise = require('../myPromiseFully');

let p1 = new myPromise((a, b) => {
    a(1)
})

setTimeout(() => {
    console.log(p1);
}, 1000);