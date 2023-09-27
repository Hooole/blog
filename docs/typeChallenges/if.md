### IF

实现一个`IF`类型，它接收一个条件类型`C`，`C`判断为真是返回类型`T`,判断为假时返回类型`F`。`C`只能是`true`或者`false`，`T`和 `F`是任意类型

例如

* `type A = If<true, 'a', 'b'>`  // expected to be 'a'
* `type B = If<false, 'a', 'b'>` // expected to be 'b'

```javascript
type IF<C extends boolean, T, F> = C extends true ? T : F
```

* `C extends boolean` : C是`boolean`类型的子类型
* `C extends true` : 可以理解为  `C === true`
