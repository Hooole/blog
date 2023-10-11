### 实现Omit

```javascript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description'>

const todo: TodoPreview = {
  title: '测试'
  completed: false,
}

```

```javascript

// 借助上文实现的Pick与Exclude实现
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>

```

* `MyExclude<keyof T, K>` 先从`T`中移除某些字段, 得到联合类型 `'title' | 'completed'`
* `MyPick<T, 'title' | 'completed'>` 从`T`中选择一些类型，组件新的类型
