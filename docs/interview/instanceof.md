## intanceof
  用来判断对象的具体类型
  判断的底层逻辑就是当前类出现在实例的原型链上。实现原理如下

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
