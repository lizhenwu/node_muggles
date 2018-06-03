function require(path) {
    let module = {exports: {}}
    (function(module, module.exports) {
        // 自己的模块程序
        function some_func() {}
        module.export = some_func
        // 
    })(module, module.exports)
    return module.exports
}
// 每个 node 进程只有一个 VM 的上下文, 不会跟浏览器相差多少,
// 每个 .js 能独立一个环境只是因为 node 帮你在外层包了一圈自执行, 所以你使用 t = 111 定义全局变量在其他地方当然能拿到.
// 关于AMD、CommonJS等参考http://javascript.ruanyifeng.com/nodejs/module.html#toc4

// todo 热更新原理

// 解析查询模块的位置， 返回文件名(完整的绝对路径)， 如果不存在则抛出错误， 不会加载模块
require.resolve()
