## 函数继承

### ES5语法

#### 1. 原型链
```js
function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue = function(){
  return this.property;
}

function SubType(){
  this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
  return this.subproperty;
}

let instance = new SubType();

console.log(instance.getSuperValue()); // true
```

#### 2. 盗用构造函数
```js
function SuperType(){
  this.colors = ['red', 'blue', 'green'];
}

function SubType(){
  SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors) // 'red, blue, green, black'

let instance2 = new SubType();
console.log(instance2.colors) // 'red, blue, green'
```

#### 3. 组合继承
```js
function SuperType(){
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function(){
  console.log(this.name);
}

function SubType(name, age){
  // 继承属性
  SuperType.call(this, name);

  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
  console.log(this.age);
}

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push('black');
console.log(instance1.colors) // 'red, blue, green, black'
instance1.sayName() // Nicholas
instance1.sayAge(); // 29

let instance2 = new SubType("Greg", 27);
console.log(instance1.colors) // 'red, blue, green'
instance2.sayName() // Greg
instance2.sayAge(); // 27
```