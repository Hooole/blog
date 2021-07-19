## 实现curry(1)(2)(3)

### 函数柯里化
  函数柯里化（curry）是函数式编程里面的概念：即只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

  简单点来说就是：每次调用函数时，它只接受部分参数，并返回一个函数，直到传递所有参数为止

#### 普通实现
```javascript
  const curry = (fn,...args) => {
    // 函数的参数个数可以通过.length获取
    // 传入的参数大于等于函数的参数，则直接执行该函数
    // 传入的参数个数小于函数的参数时，返回一个接受所有参数（当前参数和剩余参数）的函数
    return args.length >= fn.length ? fn(...args) : (..._args) => curry(fn,...args,..._args)
  }

  const add1 = (x,y,z) => {
    return x + y + z
  }
  const add = curry(add1)、
  
  add(1)(2)(3) // 6
```
#### 支持无限层级的实现

```javascript
  // 参数累加函数 
  const argsSum = (...args) => {
    return args.reduce((pre,cur) => {
      return pre+cur
    },0)
  }

  const add = (...args) => {
    // 当前参数的值并返回fn函数
    let sum1 = argsSum(...args)
    let fn = (...args1) => {
      let sum2 = argsSum(...args1)
      // 递归调用add函数，传入上次计算的值与fn参数的累加值的和
      return add(sum1+sum2)
    }
    // 重写函数的toSting方法，返回累加的值
    fn.toString = () => {
      return sum1
    }
    return fn
  }
  add(1)(2)(3)(6) // 12
```
