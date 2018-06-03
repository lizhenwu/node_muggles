const log = console.log.bind(console);
log('1');
log('2');
// process.nextTick将callback添加到next tick队列，一旦当前事件轮询队列的任务
// 全部完成，在next tick队列中的所有callback会被依次执行
// 事件轮询随后的ticks调用会在任何I/O事件和定时器之前运行
process.nextTick(function() {
    log('3');
})
log('4');
setTimeout(() => {
    log('5');
},0)
process.nextTick(function() {
    log('6')
})
// 输出顺序 1 2 4 3 6 5 
// definitelyAsync，强行异步
function definitelyAsync(maybeTrue,cb) {
    if(maybeTrue) {
        process.nextTick(cb);
        return;
    }
    fs.stat('file',cb);
}