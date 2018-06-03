console.log('b 开始');
exports.done = false;
const a = require('./a');
console.log('在b中，a.done = %j',a.done);
exports.done = true;
console.log('b 结束')