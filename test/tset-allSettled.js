const myPromise = require('../myPromiseFully');

const promise1 = myPromise.resolve(3);
const promise2 = 1;
const promises = [promise1, promise2];

myPromise.allSettled(promises).
then((results) => results.forEach((result) => console.log(result)));

setTimeout(() => {
    const p1 = myPromise.resolve(3);
    const p2 = new myPromise((resolve, reject) => setTimeout(reject, 100, 'foo'));
    const ps = [p1, p2];

    myPromise.allSettled(ps).
    then((results) => results.forEach((result) => console.log(result)));
}, 1000);

myPromise.allSettled([]).then((results) => console.log(results))