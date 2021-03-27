## 箭头函数
全局代码开始执行前，会以 window 为目标产生一个全局执行上下文， 开始对代码预编译，这时候 this 指向的就是 window，接着开始执行全局代码。

当函数代码开始执行前，会以函数为目标产生一个函数执行上下文，开始对该函数预编译，这时候 this 的指向要分几种情况（下面讨论），接着开始执行函数代码，函数代码执行完后函数执行上下文就被会删除。多个函数会产生多个执行上下文。

上面说到函数预编译的 this 分下面四种情况：

第一种： 函数自主调用 如 fun() 或者是 普通的立即执行函数（区别于箭头函数方式的立即执行函数）， this 指向 window；

第二种： 函数被调用，当函数被某个对象调用时，函数产生的执行上下文中的 this 指向该对象；

第三种： 通过 call() apply() bind() 方法改变 this，this 指向被传入的第一个参数；

第四种： 在构造函数中，this 指向被创建的实例

```js
var a = {
    origin: 'a',
    b: {
        origin: 'b',
        show: function(){
　　　       var origin = 'show';
            console.log(this.origin);
　      }
    }
}
var origin = 'window'
a.b.show();      // 因为 b 对象调用了 show 函数，所以 show 函数的执行上下文中的 this 指针指向 b 对象
var fun = a.b.show;     // 注意这里是将 show 函数赋值给fun，相当于 var fun = function(){console.log(this)}
fun();      // 因为 fun 是自主调用，所以 this 指针指向 window，自然就打印 window 对象了
```

箭头函数中的 this

首先，箭头函数不会创建自己的 this，它只会从自己的作用域链上找父级执行上下文的 this，而不是谁调用它，它的 this 就是谁。所以箭头函数中的 this，取决于你上层执行上下文的 this 。
下例中，

obj 分别调用了 show1 和 show2 两个方法，所以show1 和 show2 中的 this 都是指向 obj，

show1 中， setTimeout 里面是箭头函数，从作用域链中找到 show1 中的 this，所以它的 this 就是 obj 对象；

show2 中，setTimeout 里面的函数换成普通函数，函数自主调用，所以他的 this 就是 window 对象

```js
var id = 0;
var obj = {
    id: 1,
    show1: function(){
        setTimeout(() => {
            console.log(this.id)
        }, 1000)
    },

　　show2: function(){
　　　　setTimeout(function(){
　　　　　　console.log(this.id)
　　　　}, 2000)
　　}
}

obj.show1();    // 打印 1
obj.show2();    // 打印 0
```