### Awaited

假如有一个Promise对象，这个Promise对象会返回一个类型。在TS中，我们用Promise中的T来描述这个Promise返回的类型，实现一个类型，获取这个类型

例如

* `Promise<ExampleType>`, 返回 `ExampleType`类型
* `Promise<Promise<Promise<string | boolean>>>`, 返回 `string | boolean`类型

```javascript
type MyAwaited<T> = T extends Promise<infer U> ? U extends Promise<any> ? MyAwaited<U> : U : never
```

* `T extends Promise<infer U>` : 判断T是否是`Promise<infer U>` 的子类型。 如果满足，判断U是否是Promise对象，是则重新进行判断， 否则直接为U类型
