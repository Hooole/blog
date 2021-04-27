## intanceof
  用来判断对象的具体类型，实现原理如下
```javascript
  function newInstanceOf(source,compare) {
    const compareProtoType = compare.protoType
    let sourceProto = source.__proto__
    while(true) {
      if(sourceProto === null) {
        return false
      }
      if(sourceProto === compareProtoType) {
        return true
      }
      sourceProto = sourceProto.__proto__
    }
  }
```
