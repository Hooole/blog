## 排序

```javascript
let arr = [2,3,1,7,10,100,23,49,11,20]
// 冒泡排序
function bubble(arr) {
  for(let i = 0 ; i < arr.length-1;i++) {
    for(let j = 0; j < arr.length - 1 - i; j++ ) {
      if(arr[j] > arr[j+1]) {
        let cache = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = cache
      }
    }
  }
  return arr
}
console.time()
console.log(bubble(arr))
console.timeEnd()

// 插入排序
function insert(arr) {
  let _arr = []
  _arr.push(arr[0])
  for(let i = 1 ; i < arr.length; i++) {
    for(let j = _arr.length - 1; j >= 0; j-- ) {
      if(arr[i] > _arr[j]) {
          _arr.splice(j+1,0,arr[i])
          break
      }
      if(j === 0) {
        _arr.unshift(arr[i])
      }
    }
  }
  return _arr
}
console.time()
console.log(insert(arr))
console.timeEnd()

// 快速排序
function quick(arr) {
  if(arr.length <= 1) {
    return arr
  }
  let midIndex = Math.floor(arr.length / 2) 
  let midVal = arr.splice(midIndex,1)[0]
  let arrLeft = [],
      arrRight = []
  for(let i = 0;i < arr.length;i++) {
    arr[i] < midVal? arrLeft.push(arr[i]):arrRight.push(arr[i])
  }
  return quick(arrLeft).concat(midVal,arrRight)
}

console.time()
console.log(quick(arr))
console.timeEnd()
```