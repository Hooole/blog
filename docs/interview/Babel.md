# Babel编译对代码做了什么？

**Babel 是一个 JavaScript 编译器**

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性
* 源码转换

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
const a = 1
```

[astexplorer](https://astexplorer.net/)可以通过这个网站查看转成AST后的数据结构<br>

[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)简化的编译器原理实现<br>

我们以解析上面的函数为目标，写一个简单的parser<br>
**解析有两个关键的步骤**

1. 词法解析: 将字符串形式的代码转换为Tokens(令牌)，Tokens 可以视作是一些语法片段组成的数
2. 语法分析： 这个阶段语法解析器（Parser）会把Tokens转换为抽象语法树

### 词法分析

所以， Tokens一般长这样:

```javascript
  // const a = 1
  [
    {type: 'identifier', value: 'const'},
    {type: 'identifier', value: 'a'},
    {type: 'operator', value: '='},
    {type: 'Literal', value: '1'}
  ]
```

有了期望的结果后，我们就可以实现这个函数了

```javascript
  function tokenizer(input) {
      // 定义一个指针
      let current = 0;
      // 定义一个数组用于储存token
      let tokens = [];
      while (current < input.length) {
        // 获取指针指向的字符.
        let char = input[current];
        // 处理标识符，一般是以字母开头的连续字符
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
          let value = '';
          while (LETTERS.test(char)) {
            value += char;
            char = input[++current];
          }
          tokens.push({ type: 'identifier', value });
          continue;
        }
        // 处理空格
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
          current++;
          continue;
        }
        // 处理数字
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
          let value = '';
          while (NUMBERS.test(char)) {
            value += char;
            char = input[++current];
          }
          tokens.push({ type: 'Literal', value });
          continue;
        }
        // 处理 =
        if(char === '=') {
          tokens.push({
            type: 'operator',
            value: char,
          });
          current ++;
          continue;
        }
        throw new TypeError('无法识别当前字符 ' + char);
      }
      return tokens;
    }
```

通过此函数我们就得到了非常简单的词法分析器

### 语法分析

实现了词法分析后，我们就需要实现语法分析了，语法分析是要比词法分析复杂的多的,之所以复杂，是因为要分析各种语法（语句、表达式、声明等）的可能性，要根据Tokens提供的信息分析出代码之间的逻辑关系，只有经过词法分析token流才能成为有结构的语法树<br>
语法分析一般是遵循[estree规范](https://github.com/estree/estree)<br>
有了这些规则后我们就可以实现语法分析函数

```javascript
  function parser(tokens) {
    // 声明一个指针
    let current = 0;
    function walk() {
      let token = tokens[current];
      // 如果字符为const，则是一个声明
      if(token.type === 'identifier' && token.value === 'const') {
        const declarations = {
          type: 'VariableDeclaration',
          kind: token.value
        }
        current ++
        token = tokens[current]
        // const 后面需要跟变量，如果不是则报错
        if(token.type !== 'identifier') {
          throw new Error('const 后面需要跟变量');
        }
        // 获取变量名称
        declarations.identifierName = token.value
        current ++
        token = tokens[current]
        // 跟在’=‘后面的应该是常量或者表达式，额外判断的代码就忽略了，直接解析常量
        if(token.type === 'operator' && token.value === '=') {
          declarations.init = parseLiteral()
        }
        return declarations;
      }
      throw new TypeError(token.type);
    }
    const parseLiteral = () => {
      let init
      current ++
      const token = tokens[current]
      if(token.type === 'Literal') {
        init = {
          type: 'Literal',
          value: token.value
        }
        current++
      } 
      return init
    }
    let ast = {
      type: 'Program',
      body: [],
    };
    // 当指针指向在tokens范围内是执行
    while (current < tokens.length) {
      ast.body.push(walk());
    }
    return ast;
  }
```

这样我们就使用暴力函数parser了token流，最终得到了简陋的抽象语法树

```json
 {
  "type": "Program",
  "body": [{
      "type": "VariableDeclaration",
      "kind": "const",
      "identifierName": "a",
      "init": {
        "type": "Literal",
        "value": "1"
      }
    }]
  }
```

### 代码转换

在 Babel 中我们使用者最常使用的地方就是代码转换,大家常用的 Babel 插件就是定义代码转换规则而生的,而代码解析和生成这一头一尾都主要是 Babel 负责

#### 遍历抽象语法树

抽象语法树是一个树状数据结构,我们要生成新语法树,那么一定需要访问 AST 上的节点,因此我们需要一个工具来遍历抽象语法树的节点

```javascript
function traverser(ast, visitor) {
  // 如果节点是数组，则遍历数组
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node, parent) {
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;
      case 'VariableDeclaration':
        traverseNode(node.init, node);
        break;
      case 'Literal':
        break;
      default:
        throw new TypeError(node.type);
    }
  }
  traverseNode(ast, null);
}
```

#### 转换代码

我们之前的遍历器traverser接收两个参数,一个是 ast 节点对象,一个是 visitor,visitor本质是挂载不同方法的 JavaScript 对象,visitor 也叫做访问者,顾名思义它会访问 ast 上每个节点,然后根据针对不同节点用相应的方法做出不同的转换

```javascript
function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: [],
  };
  // 在老ast上加一个指针指向新ast
  ast._context = newAst.body;
  traverser(ast, {
    // 处理变量声明
    VariableDeclaration: {
      enter(node, parent) {
        let literalDeclaration = {
          type: node.type,
          kind: 'var',
          identifierName: node.identifierName,
          init: node.init
        }
        parent._context.push(literalDeclaration)
      },
    }
  });
  return newAst;
}
```

通过transformer函数我们就把AST转换成了新的AST

```json
 {
  "type": "Program",
  "body": [{
      "type": "VariableDeclaration",
      "kind": "var",
      "identifierName": "a",
      "init": {
        "type": "Literal",
        "value": "1"
      }
    }]
  }
```

### 生成代码

生成代码这一步实际上是根据我们转换后的抽象语法树来生成新的代码,我们会实现一个函数, 他接受一个对象(ast),通过递归生成最终的代码

```javascript
function codeGenerator(node) {
  switch (node.type) {

    // 如果是'Program'节点，那么则会遍历它的body节点，并且递归的对这些节点再次调用codeGenerator，再把结果打印进入新的一行中
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');
    // 如果是变量, 则拼接对应单元并调用其init属性
    case 'VariableDeclaration':
      return node.kind + ' ' + node.identifierName + ' = ' + codeGenerator(node.init);
    case 'Literal':
      return node.value;
    default:
      throw new TypeError(node.type);
  }
}
```

至此我们完成了一个简陋的微型 babel

```javascript
function compiler(input) {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);
  return output;
}
```

调用compiler函数就可以得到一个转换后的结果

```javascript
var a = 1
```

### 最后

我们可以通过这个微型 babel 了解 babel 的工作原理，有兴趣的可以阅读babel的源码
