
### Push

在类型系统里实现通用的`Array.push`

例如

* `type Result = Push<['1', '2'], '3'>`  // expected to be `['1', '2', '3']`

```javascript

type Push<T extends readonly any[], U> = [...T, U]

```
