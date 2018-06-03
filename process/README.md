# Process

## process.nextTick

递归调用nextTick callbacks 会阻塞任何I/O操作，就像一个while(true); 循环一样。

````js
function test() { 
  process.nextTick(() => test());
}

function test() { 
  setTimeout(() => test(), 0);
}
````
两者的区别在于后者不会阻塞I/O

## process.fork

是``processs.spawn``的特例， 专门用来衍生node.js进程，默认情况下，child_process.fork() 会使用父进程中的 process.execPath(启动Node.js进程的可执行文件所在的绝对路径) 衍生新的 Node.js 实例

## process.spawn

衍生一个新进程

## siginal信号事件

[http://nodejs.cn/api/process.html#process_signal_events](http://nodejs.cn/api/process.html#process_signal_events)

ctrl+c 发送SIGINT事件

*note*  Windows不支持发送信号，但是Node.js通过process.kill(), 和 subprocess.kill()提供了某些模拟机制。 发送信号0 可以测试进程是否存在。发送SIGINT, SIGTERM, and SIGKILL 使得目标进程无条件终止。

