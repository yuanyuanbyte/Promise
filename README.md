# Promise
手写 Promise 核心原理，完整的 Promise/A+ 实现，通过了 Promise/A+ 官方872个测试用例测试，根据规范实现了 Promise 的全部方法。

仓库中包含的几个版本
- myPromise.js: Promise 核心原理的实现，通过了 Promise/A+ 官方872个测试用例测试
- myPromiseNotes.js: myPromise.js 的注释版本
- myPromiseFully.js: 在 myPromise.js 基础上，根据规范实现了 Promise 的全部方法： 

  - Promise.resolve
  - Promise.reject
  - Promise.prototype.catch
  - Promise.prototype.finally
  - Promise.all 
  - Promise.allSettled
  - Promise.any
  - Promise.race


# Promise A+ 测试
如何证明我们写的`myPromise`就符合 **Promise/A+** 规范呢？

跑一下 Promise A+ 测试 就好啦~
## 1. 安装官方测试工具
我们使用Promise/A+官方的测试工具 [promises-aplus-tests](https://github.com/promises-aplus/promises-tests) 来对我们的`myPromise`进行测试

**安装 `promises-aplus-tests`:**

```shell
npm install promises-aplus-tests -D
```
## 2. 配置 package.json
我们实现了`deferred `方法，也通过 ES6 Module 对外暴露了`myPromise`，最后配置一下`package.json`就可以跑测试啦~😺

新建一个 `package.json` ，**配置如下：**

```javascript
// package.json
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests myPromise"
  }
}
```
