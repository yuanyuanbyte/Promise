const myPromise = require('../myPromiseFully');

var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two');
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three');
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four');
});
var p5 = new Promise((resolve, reject) => {
    reject('reject');
});

Promise.all([p1, p2, p3, p4, p5]).then(values => {
    console.log(values);
}, reason => {
    console.log(reason)
});

//From console:
//"reject"