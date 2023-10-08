### Unshift

在类型系统里实现通用的`Array.unshift`

例如

* `type Result = Unshift<['1', '2'], '0'>`  // expected to be `['0', '1', '2']`

```javascript

type Unshift<T extends readonly any[], U> = [U, ...T]

```
