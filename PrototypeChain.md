##js的原型和原型链

1. 所有的引用类型（数组、函数、对象）可以自由扩展属性（除null以外）。

2. 所有的引用类型都有一个’_ _ proto_ _'属性(也叫隐式原型，它是一个普通的对象)。

3. 所有的函数都有一个’prototype’属性(这也叫显式原型，它也是一个普通的对象)。

4. 所有引用类型，它的’_ _ proto_ _'属性指向它的构造函数的’prototype’属性。

5. 当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它的’_ _ proto_ _'属性(也就是它的构造函数的’prototype’属性)中去寻找。

**构造函数创建对象：**

```
function Func(){}
var func = new Func(){}
```
Func是一个构造函数，用new创建了一个Func的实例对象func

####prototype

每个函数都有一个prototype属性
每一个JavaScript对象(null除外)在创建的时候都会与另一个对象关联，这个对象就是原型，每一个对象都会“继承”原型的属性。

![alt prototype图片](https://upload-images.jianshu.io/upload_images/1490251-48851bf37a08259d.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

####proto

每一个JavaScript对象(null除外)都有一个proto属性，该属性指向该对象的原型

![alt proto图片](https://upload-images.jianshu.io/upload_images/1490251-e7476a8697e97aab.png?imageMogr2/auto-orient/strip|imageView2/2/w/567/format/webp)

####constructor

constructor可以理解为和prototype是一个互逆的关系，实例原型通过constructor指向构造函数

![alt constructor 图片](https://upload-images.jianshu.io/upload_images/1490251-0cac772635e8a128.png?imageMogr2/auto-orient/strip|imageView2/2/w/518/format/webp)

####原型链

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例

![alt 原型链 图片](https://upload-images.jianshu.io/upload_images/1490251-3089c135df71c956.png?imageMogr2/auto-orient/strip|imageView2/2/w/604/format/webp)

![alt 原型链 图片](https://img-blog.csdnimg.cn/20190911104433238.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5dF9hbmd1bGFyanM=,size_16,color_FFFFFF,t_70)