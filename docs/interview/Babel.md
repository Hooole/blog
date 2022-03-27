# Babel编译对代码做了什么？

**Babel 是一个 JavaScript 编译器**

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特
* 源码转换

那么Babel编译到底有什么魔法呢？它的核心原理是使用AST对源码进行分析并转为目标代码(后续添加)

### const、let编译分析

简单的说，const、let一律会被编译为var。<br>
为了保证const的不可变性，Babel如果在编译过程中发现对const声明的变量进行了二次赋值，则会直接报错，这样就可以直接在编译阶段对错误进行处理。<br>

```javascript
  const a = 1
  a = 2
  // 编译后
  function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
  var a = 1;
  2, _readOnlyError("a");
  // 可以发现，只要Babel检测到const声明的变量被改变赋值，就会主动插入一个_readOnlyError函数，并执行此函数，这个函数的内容就是报错，因此代码执行时就会直接抛出异常
```

至于let的块级概念，我们在ES5中一般通过IIFE(立即调用函数表达式)实现块级作用域，但是Babel对此处理的非常巧妙，他会在块内给变量换一个名字，这样在块外就无法被访问到了<br>

```javascript
  {
    let a = 1
  }
  console.log(a)
  // 编译后
  {
    var _a = 1;
  }
  console.log(a);
```

我们还知道使用let或const声明的变量会存在暂时性死区现象:代码声明变量所在的区块会形成一个封闭区域，在这个区域中，只要是声明变量前使用这些变量，就会报错<br>

```javascript
  let foo = 'abc'
  {
    foo = 'bcd'
    let foo
  }
  // 这段代码会报错， Uncaught ReferenceError: Cannot access 'foo' before initialization
  // 编译后
  "use strict";
  var foo = 'abc';
  {
    _foo = 'bcd';
    var _foo;
  }
  // 在严格模式下不允许使用未声明的变量，这样在声明前使用这个变量就会报错
```

### 经典的for循环问题编译分析

```javascript
  let array = []
  for(let i = 0; i < 10; i++) {
    array[i] = function() {
      console.log(i)
    }
  }
  array[6]()  
  // 6
  let array = []
  for(var i = 0; i < 10; i++) {
    array[i] = function() {
      console.log(i)
    }
  }
  array[6]() 
  // 10

  // 那babel是如何解决这个问题的呢？
  var array = [];
  var _loop = function _loop(i) {
    array[i] = function () {
      console.log(i);
    };
  };

  for (var i = 0; i < 10; i++) {
    _loop(i);
  }

  array[6]();
  // 可以看到babel使用了闭包保存了每一个循环变量i的值
```

### 箭头函数的编译分析

其实箭头函数的转换也不难理解

```javascript
  let obj = {
    prop: 1,
    func: function() {
      let _this = this
      let innerFunc = () => {
        this.prop = 2
      }
      let innerFunc1 = function() {
        this.prop = 3
      }  
    }
  }
  // 编译后
  var obj = {
    prop: 1,
    func: function func() {
      var _this2 = this;
      var _this = this;
      var innerFunc = function innerFunc() {
        _this2.prop = 2;
      };
      var innerFunc1 = function innerFunc1() {
        this.prop = 3;
      };
    }
  };
```

可以看到通过var _this2 = this,将当前环境下的this保存为_this2, 可以在调用innerFunc时用新存储的_this2替换函数体内的this

**看了几个例子之后，我们一定好奇babel背后的原理到底是什么？**

### 主要部分

* 解析: 将代码转换成AST(抽象语法树)
* 转换: 访问AST的节点进行变换操作生成新的AST
* 生成： 以新的AST为基础生成代码

接下来就实现一个简单版的babel，主要是为了了解babel的原理,具体的实现可以查看[Babel](https://github.com/babel/babel)

#### 1、代码解析

代码解析，就是我们常说的parser，用于将一段代码解析成一个数据结构<br>
例如这段es6的代码:

```javascript
const say = a =>  a
```

[astexplorer](https://astexplorer.net/)可以通过这个网站查看转成AST后的数据结构<br>

我们以解析上面的函数为目标，写一个简单的parser<br>
**解析有两个关键的步骤**

1. 词法解析: 将字符串形式的代码转换为Tokens(令牌)，Tokens 可以视作是一些语法片段组成的数
2. 语法分析： 这个阶段语法解析器（Parser）会把Tokens转换为抽象语法树
