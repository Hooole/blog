### Concat

实现`Concat`类型， 这个类型接收两个参数， 返回新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组

例如

* `type Result = Concat<[1], [2]>` // expected to be [1, 2]

```javascript
type IF<T extends any[], U extends any[]> = [...T, ...U]
```

* `T extends any[]` : 用来限制`T`是一个数组。如果传递非数组会报错
* `[...T, ...U]` : 类似JavaScript的扩展运算符`...`
