# ESLint

我们首先看下官网的介绍：可组装的JavaScript和JSX检查工具

其实对于JavaScript这种动态、弱类型的语言来说, 开发者在编写代码时更容易犯错，由于JavaScript不具备先天的编译流程，因此往往会在运行时暴露错误，而Linter([JSLint](https://www.jslint.com/help.html)、[JSHint](https://jshint.com/docs/)、[ESLint](http://eslint.cn/))可以使开发者在执行前就发现代码错误或不合理的写法

### Lint工具

1. JSLint: 检测的鼻祖，直接检测源文件字符串。 配置较少，规范严格，扩展性差，无法根据错误定位到对应规则
2. JSHint: 基于JSHint开发。规则的参数可配置，提供完善的编辑器插件，支持一些常用库类和es6，但是不支持自定义规则，且无法根据错误定位到对应规则；
3. ESLint: 基于AST树检测规则。可扩展解析器，可扩展规则及配置；

### ESLint中几条核心思想

* 所有规则都是插件化
* 所有的规则都是可配置的，可随时开关
* 所有的设计都是透明化的
* 使用[espree](https://github.com/eslint/espree)进行JavaScript解析
* 使用AST分析语法

### 下面来简单配置一个ESLint规则

```javascript
  // 首先是初始化项目
  yarn init -y
  // 安装依赖
  yarn add eslint --dev
  // 初始化ESLint
  npx eslint --init
  // 使用eslint 处理文件
  eslint xxx.js
```

### 配置文件参数

```javascript
{
    // 若项目中有多个子项目，且每个项目都会有配置项，则子项目会一直向上查找直到遇到root为true的，然后合并配置项
    "root": true,
    // 指定想启用的环境
    "env": {
      // 浏览器全局变量
      browser: true,
      // Node.js 全局变量和作用域
      node: true,
      // 启用除模块之外的所有ECMAScript 6功能
      es6: true
    },
    // 解释器，默认是espree
    "parser": "",
    // 解释器的配置
    "parserOptions": {
      sourceType: 'module',
      parser: 'babel-eslint'
    },
     // 设置规则插件
    "plugins": [
        "@typescript-eslint"
    ],
   
    // 指定的额外配置项
    extends: ['standard', 'prettier', 'plugin:vue/recommended', './.eslintrc.kf.js'],
    // 定义扩展的通过插件添加的所有规则
    rules: {},
     // 忽略的文件
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"],
}
```

### ESLint是如何工作的

总的来说就是先使用parser(默认是espree)解析JavaScript生成AST, ESLint会遍历AST,然后在遍历到不同的节点或者特定的时机的时候，触发相应的处理函数，然后在函数中，可以抛出错误或警告，给出提示。
