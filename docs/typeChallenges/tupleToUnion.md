### 元组转联合类型

```javascript
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

```javascript
// 第一种实现方式
type TupleToUnion<T extends any[]> = T[number]

// 第二种实现方式
type TupleToUnion<T extends any[]> = T extends Array<infer R> ? R : never
```

* `T[number]` : 它会自动迭代元组的数字型索引，然后将所有元素组合成一个联合类型

第二种实现方式需要了解的是tuple类型在一定条件下，是可以赋值给数组类型，比如:

```javascript
type TTuple = [string, number];
type TArray = Array<string | number>;

type Res = TTuple extends TArray ? true : false; // true
type ResO = TArray extends TTuple ? true : false; // false
```

因此使用`T extends Array<infer R>`判断是否满足条件，满足条件的情况下 `R`就为对应的联合类型
