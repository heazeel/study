### JavaScript 中独特的“面向对象”

1. 面向对象思想中有两个概念
*  **类**: 有相同的特征和行为的事物的抽象
*  **对象**: 类的一个实例

    举个例子：车是一个类，摩托车就是一个实例

    常见的面向对象的语言：Java、C++、C#、Python等

2. js不是一个严格的面向对象语言

* 说`javascript`是一种基于对象的语言应该更正确些,但说`javascript`不面向对象，在我看来则是错误的认知。只是`javascript`的面向对象与传统的**class-basedOO**(基于类的面向对象)相比, `javascript`有它与众不同的地方，其实主要是因为它没有提供象抽象、继承、重载等有关面向对象语言的许多功能, 而是把其它语言所创建的复杂对象统一起来，从而形成一个非常强大的对象系统。 这种独特性称它为**prototype-basedOO**(基于原型的面向对象).

> **JavaScript 中的原型和原型链**
> 1. 所有的引用类型（数组、函数、对象）可以自由扩展属性（除null以外）。
> 2. 所有的引用类型都有一个’_ _ proto_ _'属性(也叫隐式原型，它是一个普通的对象)。
> 3. 所有的函数都有一个’prototype’属性(这也叫显式原型，它也是一个普通的对象)。
> 4. 所有引用类型，它的’_ _ proto_ _'属性指向它的构造函数的’prototype’属性。
> 5. 当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它的’_ _ proto_ _'属性(也就是它的构造函数的’prototype’属性)中去寻找。
> 
> ```javascript
> //函数对象
> function f1(){};
> var f2 = function(){};
> var f3 = new function(){};
>
> //普通对象
> var o1 = {};
> var o2 = new Object();
> var o3 = new f1();
> ```
> ![alt 原型链 图片](https://upload-images.jianshu.io/upload_images/1490251-3089c135df71c956.png?imageMogr2/auto-orient/strip|imageView2/2/w/604/format/webp)


> **利用原型链实现属性的继承**
> ```javascript
> function Person(name,age) {
>    this.name = name;
>    this.age = age;
> }
> 
> function YellowRace(skinColor) {
>     this.skinColor = skinColor;
> }
> 
> YellowRace.prototype = new Person('hezhijie',21);
> let yr = new YellowRace('name')
> 
> console.log(yr.skinColor);
>
> hezhijie
> ```