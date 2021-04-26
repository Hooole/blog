## 深拷贝 and 浅拷贝
### 介绍
  * 基本数据类型的特点： 直接存储在栈中的数据
  * 引用数据类型的特点： 存储的是该对象在栈中的引用，真实的数据存放在堆内存中

  **引用类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会先检索其在栈中的地址，取得地址后获取堆中的实体**
  
  深拷贝和浅拷贝都是针对的引用类型，在JS中，对基本类型的赋值会对值进行一份拷贝，对引用类型的赋值，则会进行地址的拷贝，最终两个变量指向同一份数据
  ```javascript
    // 基本类型
    let a = 1
    let b = a
    a = 3
    console.log(a,b) // a：3,b：1会指向不同的数据
    // 引用类型
    let a = {c:1}
    let b = a
    a.c = 2 
    console.log(a,b) // a: {c:2},b:{c:2} 指向同一份数据
  ```
  所以对于引用类型，直接赋值会指向同一份数据，修改其中一个会对改变另一个的值<br>
  为了切断这种关系，就需要拷贝一份，根据拷贝的层级不同，只拷贝一层的叫浅拷贝，无限层级拷贝的叫深拷贝
### 常规实现
```javascript
 function isObject(obj) {
   return typeof obj === 'object' && obj !== null
 }
 function deepCopy1(root) {
   if(!isObject(root)) return root
   const target = Array.isArray(root) ? [] : {}
   for(let key in root) {
     if(isObject(root[key])) {
       target[key] = deepCopy(root[key])
     }else{
       target[key] = root[key]
     }
   }
   return target
 }
  // let a = {c:1,b:{d:3,e:[1,2,3]}}
  // 深拷贝无法循环引用问题，（a.f = a）
  // 引入hash
  function deepCopy2(root,hash=new WeakMap()) {
   if(!isObject(root)) return root
   if(hash.has(root)) return hash.get(root)
   const target = Array.isArray(root) ? [] : {}
   hash.set(root,target)
   for(let key in root) {
     if(isObject(root[key])) {
       target[key] = deepCopy(root[key],hash)
     }else{
       target[key] = root[key]
     }
   }
   return target
 }
```
### 拷贝Symbol
```javascript
  function deepCopy3(root,hash=new WeakMap()) {
    if(!isObject(root)) return root
    if(hash.has(root)) return hash.get(root)
    const target = Array.isArray(root) ? [] : {}
    hash.set(root,target)
    Reflect.ownKeys(root).forEach(key => {
      if(isObject(root[key])) {
        target[key] = deepCopy(root[key],hash)
      }else{
        target[key] = root[key]
      }
    })
    return target  
  }
```
### 解决递归爆栈问题
```javascript
  function deepCopy4(root) {
    const target =  Array.isArray(root) ? [] : {}
    const stackList = [{
      parent: target,
      key: undefined,
      data: root
    }]
    while(stackList.length) {
      const node = stackList.pop()
      const {parent,key,data} = node
      let res = parent
      if(key !== undefined) {
        res = parent[key] = Array.isArray(data) ? [] : {}
      }
      Reflect.ownKeys(data).forEach(i => {
        if(isObject(data[i])) {
          stackList.push({
            parent: res,
            key: i,
            data: data[i]
          })
        } else {
          res[i] = data[i]
        }
      })
    }
    return target
  }
```

