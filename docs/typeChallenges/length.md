### 获取元组长度

```javascript
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

```javascript

type Length<T extends readonly any[]> = T['length']

```

* `T['length']` 取 T 对象的length属性的值
