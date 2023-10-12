### 按需Readonly

```javascript
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

```javascript
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P]
}
```

* `K extends keyof T = keyof T` : 如果传递了`K`, 则只能是`T`中存在的属性，如果没有传递`K`, 则默认为 `keyof T`, 全部属性为只读

* `T & U` : 表示将`T`和`U`中的字段结合起来
