//两个模块相互require
//循环调用时，一个模块可能在未完成执行时被返回
console.log('main 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);
console.log(t)
//当 main.js 加载 a.js 时，a.js 又加载 b.js。 此时，b.js 会尝试去加载 a.js。 
//为了防止无限的循环，会返回一个 a.js 的 exports 对象的 未完成的副本 给 b.js 模块。 
//然后 b.js 完成加载，并将 exports 对象提供给 a.js 模块。

//当 main.js 加载这两个模块时，它们都已经完成加载。 因此，该程序的输出会是：

//main 开始
// a 开始
// b 开始
// 在b中，a.done = false
// b 结束
// 在a中，b.done = true
// a 结束
// 在 main 中，a.done=true，b.done=true