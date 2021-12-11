# Promise
手写 Promise 核心原理，完整的 Promises/A+ 实现，通过了 Promises/A+ 官方872个测试用例测试，根据规范实现了 ES6+ 的全部 API，包括处于 TC39 第四阶段草案的 Promise.any()。

仓库中包含的几个版本：
- **[myPromise.js](https://github.com/yuanyuanbyte/Promise/blob/main/myPromise.js)** (Promise 核心原理的实现，通过了 Promises/A+ 官方872个测试用例测试)
- **[myPromiseNotes.js](https://github.com/yuanyuanbyte/Promise/blob/main/myPromiseNotes.js)** (myPromise.js 的注释版本)
- **[myPromiseFully.js](https://github.com/yuanyuanbyte/Promise/blob/main/myPromiseFully.js)** (在 myPromise.js 基础上，根据规范实现了 Promise ES6+ 的全部 API) 

  - Promise.resolve
  - Promise.reject
  - Promise.prototype.catch
  - Promise.prototype.finally
  - Promise.all 
  - Promise.allSettled
  - Promise.any
  - Promise.race


# Promises/A+ 测试
如何证明我们写的`myPromise`就符合 **Promises/A+** 规范呢？

跑一下 Promises/A+ 测试 就好啦~
## 1. 安装官方测试工具
我们使用Promises/A+官方的测试工具 [promises-aplus-tests](https://github.com/promises-aplus/promises-tests) 来对我们的`myPromise`进行测试

**安装 `promises-aplus-tests`:**

```shell
npm install promises-aplus-tests -D
```
## 2. 配置 package.json
我们实现了`deferred `方法，也通过 ES6 Module 对外暴露了`myPromise`，最后配置一下`package.json`就可以跑测试啦~😺

新建一个 `package.json` ，**配置如下：**

package.json
```javascript
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests myPromise"
  }
}
```
- 上面的配置 执行 `npm run test`，将会测试 myPromise.js。

- 如果希望测试注释版本 myPromiseNotes.js，则把 package.json 改为下面配置即可：

```javascript
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests myPromiseNotes"
  }
}
```


