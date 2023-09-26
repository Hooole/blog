### 第一个元素

```javascript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]


// type First<T extends any[]> = T extends [] ? never : T[0]

// type First<T extends any[]> = K in T[number] ? K : never

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
```

```javascript
// 索引实现方式
type First<T extends any[]> = T extends [] ? never : T[0]
// 占位实现方式
type First<T extends any[]> = T extends <infer K, ...infer P> ? K : never
```

* T extends [] 用来判断T是否是一个空数组
* T[0] 取数组的第一个元素
* infer K 表示数组第一个元素的占位
* ...infer P 表示数组剩余元素的占位
