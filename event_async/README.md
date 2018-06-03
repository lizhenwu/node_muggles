# Promise

````js
let dosth = new Promise((resolve,reject) => {
    console.log(1);
    resolve();
})
dosth.then(() => {
    console.log(2);
})
````
即便封装的是同步代码，``then()``也是异步的，而promise定义时的内部代码是同步执行的
````js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
````
以上程序输出为2 3 5 4 1

# 阻塞/异步

单纯使用回调函数并不会异步, IO操作才可能会异步, 除此之外还有使用 setTimeout 等方式实现异步.
实现一个异步的reduce

# Events

事件注册和触发调用是同步的，以保证事件触发时以事件注册顺序执行监听事件，``emitter.prependListener()``可以将事件监听器添加到监听器数组的开头

注意，一旦一个事件被触发，所有绑定到它的监听器都会按顺序依次触发。 这意味着，在事件触发后、最后一个监听器完成执行前，任何 ``removeListener()`` 或 ``removeAllListeners()`` 调用都不会从 ``emit()`` 中移除它们。 随后的事件会像预期的那样发生。

````js
const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('myEvent', () => {
  console.log('hi 1');
});

emitter.on('myEvent', () => {
  console.log('hi 2');
});

emitter.emit('myEvent');
````
输出为
````cmd
hi 1
hi 2
````
eventEmitter.emit() 方法允许将任意参数传给监听器函数。 当一个普通的监听器函数被 EventEmitter 调用时，标准的 this 关键词会被设置指向监听器所附加的 EventEmitter。
**也可以使用 ES6 的箭头函数作为监听器。但是这样 this 关键词就不再指向 EventEmitter 实例**

关于setTimeout(0)和setImmediate的区别

想创建异步操作的话毋庸置疑是使用setImmediate