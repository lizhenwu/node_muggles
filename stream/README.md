参考 [深入理解 Node.js Stream 内部机制](http://taobaofed.org/blog/2017/08/31/nodejs-stream/)

## 对象模式

通过 Node API 创建的流, 只能够对字符串或者 buffer 对象进行操作. 但其实流的实现是可以基于其他的 JavaScript 类型(除了 null, 它在流中有特殊的含义)的. 这样的流就处在``对象模式(objectMode)`` 中. 在创建流对象的时候, 可以通过提供 objectMode 参数来生成对象模式的流. 试图将现有的流转换为对象模式是不安全的.

## 缓冲区

Node.js 中 stream 的缓冲区, 以开头的 C语言 拷贝文件的代码为模板讨论, (抛开异步的区别看) 则是从 src 中读出数据到 buf 中后, 并没有直接写入 dest 中, 而是先放在一个比较大的缓冲区中, 等待写入(消费) dest 中. 即, 在缓冲区的帮助下可以使读与写的过程分离.

Readable 和 Writable 流都会将数据储存在内部的缓冲区中. 缓冲区可以分别通过 writable._writableState.getBuffer() 和 readable._readableState.buffer 来访问. 缓冲区的大小, 由构造 stream 时候的 highWaterMark 标志指定可容纳的 byte 大小, 对于 objectMode 的 stream, 该标志表示可以容纳的对象个数.

## 可读流

当一个可读实例调用 stream.push() 方法的时候, 数据将会被推入缓冲区. 如果数据没有被消费, 即调用 stream.read() 方法读取的话, 那么数据会一直留在缓冲队列中. 当缓冲区中的数据到达 highWaterMark 指定的阈值, 可读流将停止从底层汲取数据, 直到当前缓冲的报备成功消耗为止.

## 可写流

在一个在可写实例上不停地调用 writable.write(chunk) 的时候数据会被写入可写流的缓冲区. 如果当前缓冲区的缓冲的数据量低于 highWaterMark 设定的值, 调用 writable.write() 方法会返回 true (表示数据已经写入缓冲区), 否则当缓冲的数据量达到了阈值, 数据无法写入缓冲区 write 方法会返回 false, 直到 drain 事件触发之后才能继续调用 write 写入.

## Duplex 和 Transform 

Duplex 流和 Transform 流都是同时可读写的, 他们会在内部维持两个缓冲区, 分别对应读取和写入, 这样就可以允许两边同时独立操作, 维持高效的数据流. 比如说 net.Socket 是一个 Duplex 流, Readable 端允许从 socket 获取、消耗数据, Writable 端允许向 socket 写入数据. 数据写入的速度很有可能与消耗的速度有差距, 所以两端可以独立操作和缓冲是很重要的.

## pipe

stream 的 .pipe(), 将一个可写流附到可读流上, 同时将可写流切换到流模式, 并把所有数据推给可写流. 在 pipe 传递数据的过程中, objectMode 是传递引用, 非 objectMode 则是拷贝一份数据传递下去.

pipe 方法最主要的目的就是将数据的流动缓冲到一个可接受的水平, 不让不同速度的数据源之间的差异导致内存被占满. 关于 pipe 的实现参见 [David Cai 的 通过源码解析 Node.js 中导流（pipe）的实现](https://cnodejs.org/topic/56ba030271204e03637a3870)
