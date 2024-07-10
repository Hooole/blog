## Object Map

  对象 实现 map 方法， 类似Array.prototype.map

```javascript
  Object.prototype.map = function(cb, thisArg) {
    if(typeof cb !== 'function') {
      return throw new TypeError('cb must be a function')
    }
    const result = {}
    for(const key in this) {
      if(this.hasOwnProperty(key)) {
        result[key] = cb.call(thisArg, this[key], key, this)
      }
    }
    return result
  }

  const obj = {
    "a": 1,
    "b": 2,
    "c": 3,
  }

  let a = obj.map(function(key,val){
    if(val % 2 === 1) {
      return val * 2
    }
    return val
  })
  console.log(a);  // { a: 2, b: 2, c: 6 }

```
