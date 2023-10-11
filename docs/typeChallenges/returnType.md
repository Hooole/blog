### 内置ReturnType类型

实现内置的 ReturnType 类型

例如

```javascript
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // should be "1 | 2"
```

```javascript
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
```

* `T extends (...args: any[]) => infer R` : 判断`T`类型是否是一个函数的子类型，既`T`是不是一个函数， `infer R` 表示待推导的函数类型为R， 后续可以在表达式中使用`R`来代替真正的返回类型
