var vm = require('vm');
var localVar = 'initial value';

vm.runInThisContext('var localVar = "vm";');
console.log('localVar: ', localVar);  //  localVar:  initial value

console.log('global.localVar: ', global.localVar); //  global.localVar:  vm

// vm 的一系列函数中跑脚本都无法对当前的局部变量进行访问。
// 各函数能访问自己的global，而 runInThisContext 的 global 与
// 当前上下文的 global 是一样的，所以能访问当前的全局变量
