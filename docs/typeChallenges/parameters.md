### 内置Parameters类型

实现内置的 Parameters 类型

例如

`const foo = (arg1: string, arg2: number): void => {}`

`type FunctionParamsType = MyParameters<typeof foo> //[arg1: string, arg2: number]`

```javascript
type MyParameters<T extends (...args: any[] => any)> = T extends (...args: infer P) => any ? P : never
```
