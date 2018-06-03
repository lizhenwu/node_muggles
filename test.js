// const fs = require('fs')
// fs.unlinkSync('./test.txt')
// function * test() {
//     yield 1;
//     yield 2;
//     return 3;
// }

// var a = test();
// for(let i of a) {
//     console.log(i.value);
// }
const http = require('http')

const server = http.createServer((req, res) => {
    res.end('fuck')
}).listen(3000)  // listening在这已经触发，也就是说是在监听listening之前
                 // 所以实际上下面的回调能执行是因为listening事件是在nextTick中的

server.on('listening', () => {
    console.log('server running')
})