const myPromsie = require('../myPromiseFully')

const p1 = Promise.resolve(3);
const p2 = {
    then: function (onFulfill) {
        onFulfill('then函数')
    }
}
const p3 = 42;

Promise.all([p1, p2, p3]).then(result => {
    console.log('原生 all fulfilled :>> ', result);
}, reason => {
    console.log('原生 all rejected :>> ', reason)
})

myPromsie.all([p1, p2, p3]).then(result => {
    console.log('手写 all fulfilled :>> ', result);
}, reason => {
    console.log('手写 all rejected :>> ', reason)
})