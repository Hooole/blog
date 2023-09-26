### 实现Exclude

```javascript
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

```javascript
type MyExclude<T, U> = T extends U ? never : T
```

* `T extends U` 这段代码会从`T`的子类型开始分发

```javascript
'a' | 'b' | 'c' extends 'a' 
=> (
  'a' extends 'a' ? never : 'a' | 
  'b' extends 'a' ? never : 'b' |
  'c' extends 'a' ? never : 'c'
)
=> 'b' | 'c'
```
