// IPC 进程间通信，让不同的进程能够互相访问资源并进行协调工作
// node用管道（pipe）实现
const fork = require('child_process').fork;
const cpus = require('os').cpus();
const workers = {};
const server = require('net').createServer();
server.listen(3000,() => {
    console.log(`server start at ${Object.values(server.address())}`);
});
// 限制频繁重启
// 重启次数
const limit = 10;
// 时间单位
const during = 60000;
const restart = [];
const isTooFrequently = function() {
    // 记录重启时间
    let time = Date.now();
    let length = restart.push(time);
    if(length > limit) {
        // 取出最后十个记录
        restart = restart.slice(limit * -1);
    }
    return restart.length >= limit && restart[restart.length-1] - restart[0] < during
}
const createWorker = () => {
    // 检查是否频繁重启
    if(isTooFrequently()) {
        // 触发giveup事件后不再重启
        process.emit('giveup',length,during);
        return;
    }
    let worker = fork('./worker.js');
    // 有工作进程发出自杀信号就重启新的进程
    worker.on('message',function(message) {
        if(message.act = 'suicide') {
            createWorker();
        }
    });
    worker.on('exit',function() {
        console.log(`worker ${worker.pid} exited`);
        delete workers[worker.pid]
    });
    workers[worker.pid] = worker;
    // 发送句柄
    worker.send('server',server);
    console.log(`worker ${worker.pid} created`);
}
for(let i = 0; i < cpus.length; i++) {
    createWorker();
}

process.on('exit',function() {
    for(let pid in workers) {
        workers[pid].kill();
    }
})