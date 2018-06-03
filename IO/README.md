# IO

Buffer 是 Node.js 中用于处理二进制数据的类, 其中与 IO 相关的操作 (网络/文件等) 均基于 Buffer. Buffer 类的实例非常类似整数数组, 但其大小是固定不变的, 并且其内存在 V8 堆栈外分配原始内存空间. Buffer 类的实例创建之后, 其所占用的内存大小就不能再进行调整.

## console

Chrome的devtools上的console和nodejs的实现不同, 没有占位符处理? console同步和异步

一般实现
````js
Console.prototype.log = function(...args) {
  this._stdout.write(`${util.format.apply(null, args)}\n`);
};
````

## File

### 编码

### stdio

stdio (standard input output) 标准的输入输出流, 即输入流 (stdin), 输出流 (stdout), 错误流 (stderr) 三者. 在 Node.js 中分别对应 process.stdin (Readable), process.stdout (Writable) 以及 process.stderr (Writable) 三个 stream.

Linux/unix 的 fd (文件描述符) 都被设计为整型数字
````js
console.log(process.stdin.fd); // 0
console.log(process.stdout.fd); // 1
console.log(process.stderr.fd); // 2
````

### 同步地获取用户输入

获取用户的输入其实就是读取 Node.js 进程中的输入流 (即 process.stdin 这个 stream) 的数据，而要同步读取, 则是不用异步的 read 接口, 而是用同步的 readSync 接口去读取 stdin 的数据即可实现. 

### Readline

readline 模块提供了一个用于从 Readble 的 stream (例如 process.stdin) 中一次读取一行的接口, 可以用来读取文件

实现上, realine 在读取 TTY 的数据时, 是通过 input.on('keypress', onkeypress) 时发现用户按下了回车键来判断是新的 line 的, 而读取一般的 stream 时,则是通过缓存数据然后用正则 .test 来判断是否为 new line 的

## REPL



