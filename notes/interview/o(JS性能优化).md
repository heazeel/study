### 隐藏类和删除操作
&emsp;&emsp;根据 JavaScript 所在的运行环境，有时候需要根据浏览器使用的 JavaScript 引擎来采取不同的性能优化策略。截至 2017 年，Chrome 是最流行的浏览器，使用 V8 JavaScript 引擎。V8 在将解释后的 JavaScript代码编译为实际的机器码时会利用“**隐藏类**”。如果你的代码非常注重性能，那么这一点可能对你很重要。

&emsp;&emsp;运行期间，V8 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好，V8 会针对这种情况进行优化，但不一定总能够做到。比如下面的代码：

```js
function Article() {
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
} 
let a1 = new Article();
let a2 = new Article();
```

&emsp;&emsp;V8 会在后台配置，让这两个类实例共享相同的隐藏类，因为这两个实例**共享**同一个构造函数和原型。假设之后又添加了下面这行代码：

```js
a2.author = 'Jake';
```

&emsp;&emsp;此时两个 Article 实例就会对应两个不同的隐藏类。根据这种操作的频率和隐藏类的大小，这有可能对性能产生明显影响。
&emsp;&emsp;当然，解决方案就是避免 JavaScript 的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在构造函数中一次性声明所有属性，如下所示：

```js
function Article(opt_author) {
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = opt_author;
} 
let a1 = new Article();
let a2 = new Article('Jake');
```

&emsp;&emsp;这样，两个实例基本上就一样了（不考虑 hasOwnProperty 的返回值），因此可以共享一个隐藏类，从而带来潜在的性能提升。不过要记住，使用 delete 关键字会导致生成相同的隐藏类片段。看一下这个例子：

```js
function Article() {
 this.title = 'Inauguration Ceremony Features Kazoo Band';
 this.author = 'Jake';
}

let a1 = new Article();
let a2 = new Article();

delete a1.author;
```

&emsp;&emsp;在代码结束后，即使两个实例使用了同一个构造函数，它们也不再共享一个隐藏类。动态删除属性与动态添加属性导致的后果一样。最佳实践是把不想要的属性设置为 null。这样可以保持隐藏类不变和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果。比如：

```js
function Article(){
  this.title = 'This is title!';
  this.author = 'Jake'
}

let a1 = new Article();
let a2 = new Article();

a1.author = null;
```