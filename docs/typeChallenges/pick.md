### 实现Pick

```javascript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Demo {
  title: string
  description: string
  completed: boolean
}
type TodoDemo = MyPick<Demo, 'title' | 'completed'>
const todo: TodoDemo = {
  title: 'Clean room',
  completed: false,
}

```

#### keyof 取interface的键 保存为联合类型

```javascript
interface userType {
  name: string
  age: number
}
type keyofUser = keyof userType

// keyofUser = "name" | "age"
```

#### in 取联合类型的值，主要用于数组和对象的构建

```javascript
type name = 'firstName' | 'lastName'
type TName = {
  [K in name]: string
}
// TName = {firstName: string, lastName: string}
```

#### 用于实际开发

```javascript
function getValue(o: object, key: string) {
  return o[key]
}
const obj1 = { name: '张三', age: 18 }
const values = getValue(obj1, 'name')
```

这样写丧失了ts的优势：

* 无法确定返回值类型
* 无法对key进行约束

```javascript
// 正确写法
function getValue<T extends object, K extends keyof T>(o: T, key: K): T[K] {
  return o[key]
}
// 这样就作了约束，key只能使用对象的键
```
