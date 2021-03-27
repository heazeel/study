### async、await 和 promise

#### async
```js
async function timeout(flag) {
    if (flag) {
        return 'hello world'
    } else {
        throw 'my god, failure'
    }
}
console.log(timeout(true));  // 调用Promise.resolve() 返回promise 对象。
console.log(timeout(false)); // 调用Promise.reject() 返回promise 对象。

timeout(true).then(result => console.log(result)) // hello world
timeout(true).catch(err => console.log(err)) // my god, failure
```

#### await
```js
// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000);
    } )
}
```
现在再写一个async 函数，从而可以使用await 关键字， await 后面放置的就是返回promise对象的一个表达式，所以它后面可以写上 doubleAfter2seconds 函数的调用

```js
async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}
```
现在调用testResult 函数

```js
testResult();
```
打开控制台，2s 之后，输出了60. 

现在我们看看代码的执行过程，调用testResult 函数，它里面遇到了await, await 表示等一下，代码就暂停到这里，不再向下执行了，它等什么呢？等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。具体到 我们的代码, 遇到await 之后，代码就暂停执行了， 等待doubleAfter2seconds(30) 执行完毕，doubleAfter2seconds(30) 返回的promise 开始执行，2秒 之后，promise resolve 了， 并返回了值为60， 这时await 才拿到返回值60， 然后赋值给result， 暂停结束，代码才开始继续执行，执行 console.log语句。

就这一个函数，我们可能看不出async/await 的作用，如果我们要计算3个数的值，然后把得到的值进行输出呢？

```js
async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(first + second + third);
}
```
6秒后，控制台输出220, 我们可以看到，写异步代码就像写同步代码一样了，再也没有回调地域了。

#### promise
Promise 是异步编程的一种解决方案
有三种状态：pending（进行中）、resolved（已成功）和rejected（已失败）