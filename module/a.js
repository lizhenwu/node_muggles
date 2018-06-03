console.log('a 开始');
exports.done = false;
const b = require('./b');
console.log('在a中，b.done = %j',b.done);
exports.done = true;
console.log('a 结束');
// exports = {name: 'test' }