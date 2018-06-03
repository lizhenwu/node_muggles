/**
 * Readable stream 的两种模式
 */

// Flowing mode 流动模式
// 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用
// 绑定on data事件自动触发这个模式
const Readable = require('stream').Readable;

class MyReadable extends Readable {
    constructor(sourcedata,options) {
        super(options);
        this.datasource = datasource;
    }
    _read() {
        const data = this.datasource.makeData();
        this.push(data);
    }
}
const datasource = {
    data: new Array(10).fill('-'),
    makeData() {
        if(!datasource.data.length) return null;
        return datasource.data.pop();
    } 
}
const myReadable = new MyReadable(datasource);
myReadable.setEncoding('utf8');
myReadable.on('data',chunk => {
    console.log(chunk);
})

// non-flowing mode 暂停模式 Stream的预设模式
// 监听了 onreadable 事件后，会进入这种模式
const myReadable = new MyReadable(datasource);
myReadable.setEncoding('utf8');
myReadable.on('readable', () => {
    let chunk;
    while (null !== (chunk = myReadable.read())) {
      console.log(`Received ${chunk.length} bytes of data.`);
    }
});

/**
 * 可写流 Writable
 */
function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 10000;
    write();
    function write() {
      let ok = true;
      while(i-- > 0 && ok) {
        // 写入结束时回调
        ok = writer.write(data, encoding, i === 0 ? callback : null);
      }
      if (i > 0) {
        // 遇到"背压"
        // 这里提前停下了，'drain' 事件触发后才可以继续写入  
        console.log('drain', i);
        writer.once('drain', write);
      }
    }
  }
const Writable = require('stream').Writable;
const writer = new Writable({
    write(chunk,encoding,callback) {
        setTimeout(() => {
            callback && callback();
        })
    }
})
writeOneMillionTimes(writer,'simple','utf8',() => {
    console.log('end')
})
