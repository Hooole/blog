## 实现Promise

### promise的基本特点

* 可进行链式调用，且每次then返回了新的Promise
* 只输出第一次resolve的内容，reject的内容没有输出，即Promise是有状态且状态只可以由pending -> fulfilled -> reject,是不可逆的
* then中返回了新的Promise,但是then中注册的回调仍然是属于上一个Promise的 

### Promise简单实现
```javascript
  function newPromise(fn) {
    let state = 'pending'
    let value = null
    const callbacks = []
    this.then = function(onFulfilled,onRejected) {
      return new newPromise((resolve,reject) => {
        handle({
          onFulfilled,
          onRejected,
          resolve,
          reject
        })
      })
    }
    this.catch = function(onError) {
      this.then(null,onError)
    }
    function handle(callback) {
      if(state === 'pending') {
        callbacks.push(callback)
        return
      }
      const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
      const next = state === 'fulfilled' ? callback.resolve : callback.reject

      if(!cb) {
        return next(value)
      }
      try{
        const ret = cb(value)
        next(ret)
      }catch(ex) {
        callback.reject(ex)
      }
    }
    function resolve(newValue) {
     const fn = () => {
       if(state !== 'pending') return
      // 链式调用 当then方法中继续返回promise对象时处理
       if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
         const { then } = newValue
         if(typeof then === 'function') {
            then.call(newValue,resolve,reject)
         }
       }
       state = 'fulfilled'
       value = newValue
       handleCb()
     }
     setTimeout(fn,0)
    }

    function reject(error) {
      const fn = () => {
       if(state !== 'pending') return
       if(error && (typeof error === 'object' || typeof error === 'function')) {
          const { then } = error
          if(typeof then === 'function') {
            then.call(error,resolve,reject)
          }
       }
       state = 'rejected'
       value = error
       handleCb()
     }
     setTimeout(fn,0)
    }

    function handleCb() {
      while(callbacks.length) {
        let callback = callbacks.shift()
        handle(callback)
      }
    }
    fn(resolve,reject)
  }
```