###变量

***函数提升优先级高于变量提升***

使用var重新声明一个已经存在的变量，是无效的
如果第二次声明的时候还进行了赋值，则会覆盖掉前面的值
```javascript
{
  var a = 1;
}
a // 1
```
区块对于var命令不构成单独的作用域，与不使用区块的情况没有任何区别


###函数
**函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。这意味着，在函数体内修改参数值，不会影响到函数外部。**
```javascript
var p = 2;

function f(p) {
  p = 3;
}
f(p);

p // 2
```
上面代码中，变量p是一个原始类型的值，传入函数f的方式是传值传递。因此，在函数内部，p的值是原始值的拷贝，无论怎么修改，都不会影响到原始值。

**但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。**
```javascript
var obj = { p: 1 };

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2
```
上面代码中，传入函数f的是参数对象obj的地址。因此，在函数内部修改obj的属性p，会影响到原始值。

**注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。**
```javascript
var obj = [1, 2, 3];

function f(o) {
  o = [2, 3, 4];
}
f(obj);

obj // [1, 2, 3]
```
上面代码中，在函数f()内部，参数对象obj被整个替换成另一个值。这时不会影响到原始值。这是因为，形式参数（o）的值实际是参数obj的地址，重新对o赋值导致o指向另一个地址，保存在原地址上的值当然不受影响。


###闭包
```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```
上面代码中，函数f1的返回值就是函数f2，由于f2可以读取f1的内部变量，所以就可以在外部获得f1的内部变量了。

闭包就是函数f2，即能够读取其他函数内部变量的函数。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

###立即调用函数表达式
通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。
它的目的有两个：
一是不必为函数命名，避免了污染全局变量；
二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```
上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

###指数运算符
指数运算符是右结合，而不是左结合。即多个指数运算符连用时，先进行最右边的计算。
```javascript
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

###比较运算符
这里需要注意与NaN的比较。任何值（包括NaN本身）与NaN比较，返回的都是false。
```javascript
1 > NaN // false
1 <= NaN // false
'1' > NaN // false
'1' <= NaN // false
NaN > NaN // false
NaN <= NaN // false
```

###属性描述对象Object

####1.Object.getOwnPropertyDescriptor()
`Object.getOwnPropertyDescriptor()`方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
```javascript
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```
上面代码中，`Object.getOwnPropertyDescriptor()`方法获取obj.p的属性描述对象。

注意，`Object.getOwnPropertyDescriptor()`方法只能用于对象自身的属性，不能用于继承的属性。
```
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined
```
上面代码中，toString是obj对象继承的属性，`Object.getOwnPropertyDescriptor()`无法获取。

####2.Object.getOwnPropertyNames()
返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历

跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名。
```javascript
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
// ['hasOwnProperty',
//  'valueOf',
//  'constructor',
//  'toLocaleString',
//  'isPrototypeOf',
//  'propertyIsEnumerable',
//  'toString']
```

####3.Object.defineProperty()，Object.defineProperties()
`Object.defineProperty`方法接受三个参数，依次如下。

* object：属性所在的对象
* propertyName：字符串，表示属性名
* attributesObject：属性描述对象

举例来说，定义obj.p可以写成下面这样。
```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});
```

如果一次性定义或修改多个属性，可以使用`Object.defineProperties()`方法。
```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});
```

一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错。
```javascript
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
```

####Object.prototype.propertyIsEnumerable()
实例对象的`propertyIsEnumerable()`方法返回一个布尔值，用来判断某个属性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false。
```javascript
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```
###Array对象
####push、pop、shift、unshift
`push()`：用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
`pop()`：方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。
`shift()`：方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
`unshift()`：方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

*****
####join
`join()`：方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
如果数组成员是undefined或null或空位，会被转成空字符串。
```javascript
[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
```

通过call方法，这个方法也可以用于字符串或类似数组的对象。
```javascript
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```
***
####concat
`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
```javascript
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]
```

***
####reserse
`reverse`方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。


***
####slice
`slice()`方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。
```javascript
var a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```
上面代码中，最后一个例子slice()没有参数，实际上等于返回一个原数组的拷贝。

如果slice()方法的参数是负数，则表示倒数计算的位置。
```javascript
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```

如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。
```javascript
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```
`slice()`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```
上面代码的参数都不是数组，但是通过call方法，在它们上面调用slice()方法，就可以把它们转为真正的数组。

***
####splice
`splice()`方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。

splice的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]
```

起始位置如果是负数，就表示从倒数位置开始删除。
```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]
```
上面代码表示，从倒数第四个位置c开始删除两个成员。

如果只是单纯地插入元素，splice方法的第二个参数可以设为0。
```javascript
var a = [1, 1, 1];

a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```
如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
```javascript
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

***
####sort
`sort`方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
```javascript
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
```

如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数。
```javascript
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]
```
上面代码中，sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

***
####map
map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
```javascript
var numbers = [1, 2, 3];

numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

numbers
// [1, 2, 3]
```
上面代码中，numbers数组的所有成员依次执行参数函数，运行结果组成一个新数组返回，原数组没有变化。

map方法接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
```javascript
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```
上面代码中，map方法的回调函数有三个参数，elem为当前成员的值，index为当前成员的位置，arr为原数组（[1, 2, 3]）

***
####forEach
如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法。
forEach的用法与map方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。
```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```
forEach方法会跳过数组的空位

***
####filter
`filter`方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。
```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]
```

***
####reduce 与 reduceRight
reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样。
```javascript
[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

***
####indexOf 与 lastIndexOf
indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
```javascript
var a = ['a', 'b', 'c'];

a.indexOf('b') // 1
a.indexOf('y') // -1
```
indexOf方法还可以接受第二个参数，表示搜索的开始位置。
```javascript
['a', 'b', 'c'].indexOf('a', 1) // -1
```