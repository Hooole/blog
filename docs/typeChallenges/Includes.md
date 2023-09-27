
### Includes

实现一个`Includes`类型， 类似JavaScript中的Array.includes方法，接收两个参数，返回的类型要么是true,要么是false

例如

* `type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>`  // expected to be `false`

```javascript

// 简单版
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

// 完整版
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Includes<T extends readonly any[], U> = 
  T extends [infer R, ... infer L] 
    ? Equal<R, U> extends true 
      ? true : Includes<L, U> 
        : false
```

* `T[number]` : 返回数组中所有数字类型键对应的值，将这些值构造成一个联合类型 例如 `1 | 2 | 3`
* `U extends T[number]` : 判断`U`是否是某个联合类型的子类型， 例如 `1 extends 1 | 2 | 3`
* `Equal` : 用来判断两个值是否相等
