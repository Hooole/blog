### 深度Readonly

```javascript
ype X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

```javascript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends {[key: string]: any} ? DeepReadonly<T[P]> : T[P]
}
```

* `T[P] extends {[key: string]: any}` : 判断是否是一个嵌套对象，如果是则递归调用DeepReadonly

更完善的实现方式可以参考[vuejs中的实现](https://github.com/vuejs/core/blob/main/packages/reactivity/src/reactive.ts#L145)
