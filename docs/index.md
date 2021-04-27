## 从原型到原型链
### 构造函数创建对象
```javascript
  function Person() {}
  const person = new Person()
  person.name = 'Jack'
```
在这个例子中，Person就是一个构造函数，通过new 创建了一个实例化对象person
### prototype
**每个函数都有一个prototype属性**
```javascript
  function Person() {}
  // prototype是函数才会有的属性
  Person.prototype.name = 'Jack'
  const person1 = new Person()
  const person2 = new Person()
  console.log(person1.name) // Jack
  console.log(person2.name) // Jack
```
函数的prototype都指向一个对象，这个对象正好是调用该构造函数的而创建的实例对象的原型
**每个javascript对象（除null）之外在创建的时候就会与之关联另一个对象，这个对象就是我们说的原型，每一个对象都可以在原型上继承属性**
### __proto__
这是每一个JavaScript对象（除null）都会有的一个属性,这个属性指向该对象的原型
### contructor
每一个原型都有一个contrcutor指向关联的构造函数
### 实例与原型
当读取实例属性时，都会查找与对象关联的原型的属性，如果查不到，就找原型的原型，一直找到最顶层为止
```javascript
  function Person() {}
  // prototype是函数才会有的属性
  Person.prototype.name = 'Jack'
  const person1 = new Person()
  person1.name = 'David' 
  console.log(person1.name) // David
  delete person1.name
  console.log(person1.name) // Jack
```
### 原型链
 <img :src="$withBase('/images/prototype.png')" alt="foo" />

  **图中由相互关联的原型组成的链状结构就成为原型链（蓝色部分）**