### 内存泄漏
&emsp;&emsp;写得不好的 JavaScript 可能出现难以察觉且有害的内存泄漏问题。在内存有限的设备上，或者在函数会被调用很多次的情况下，内存泄漏可能是个大问题。JavaScript 中的内存泄漏大部分是由不合理的引用导致的。
&emsp;&emsp;意外声明全局变量是最常见但也最容易修复的内存泄漏问题。下面的代码没有使用任何关键字声明变量：

```js
function setName() {
  name = 'Jake';
}
```

&emsp;&emsp;此时，解释器会把变量 name 当作 window 的属性来创建（相当于 window.name = 'Jake'）。可想而知，在 window 对象上创建的属性，只要 window 本身不被清理就不会消失。这个问题很容易解决，只要在变量声明前头加上 var、let 或 const 关键字即可，这样变量就会在函数执行完毕后离开作用域。

&emsp;&emsp;定时器也可能会悄悄地导致内存泄漏。下面的代码中，定时器的回调通过闭包引用了外部变量：

```js
let name = 'Jake';
setInterval(() => {
  console.log(name);
}, 100);
```

&emsp;&emsp;只要定时器一直运行，回调函数中引用的 name 就会一直占用内存。垃圾回收程序当然知道这一点，因而就不会清理外部变量。


&emsp;&emsp;使用 JavaScript 闭包很容易在不知不觉间造成内存泄漏。请看下面的例子：

```js
let outer = function() {
  let name = 'Jake';
  return function() {
    return name;
  };
};
```

&emsp;&emsp;调用 outer()会导致分配给 name 的内存被泄漏。以上代码执行后创建了一个内部闭包，只要返回的函数存在就不能清理 name，因为闭包一直在引用着它。假如 name 的内容很大（不止是一个小字符串），那可能就是个大问题了。
