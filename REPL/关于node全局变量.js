// const http = require('http');
// const fs = require('fs');
// const host = '192.168.1.117';
// function app(req,res) {
//     fs.createReadStream('./danmu.html').pipe(res); 
// }

// const server = http.createServer(app);


// server.listen(3000,host)

// 参考https://xcoder.in/2015/11/26/a-js-problem-about-global/
// 对于Node来说，'全局变量与全局对象的属性等价'只对REPL环境适用，模块环境之中，全局变量必须显式声明成global对象的属性。
var a = 2;
function foo(){
    console.log(this.a);
}
foo(); // 执行node 此文件.js 输出undefined

// 结论
// 在于 Node.js 的 vm 里面，顶级作用域下的 var 会把变量贴到 global 下面。
// 而 REPL 使用了vm。然后 $ node 进入的一个模式就是
// 一个特定参数下面启动的一个REPL。
// node 全局环境 REPL 脚本执行等问题



// 不知道什么时候写的什么东西
// function List() {}

// function EmptyList() {}
// EmptyList.prototype = new List();
// EmptyList.prototype.constructor = EmptyList;

// EmptyList.prototype.toString = function() {
//   if(this.isEmpty()) return '()'
//   let res = []
//   let a = this
//   while(a.value) {
//     res.push(a.value)
//     a = a.next
//   }
//   return '(' + res.join(' ') + ')'
// };
// EmptyList.prototype.isEmpty = function() { 
//   return this.length() === 0
// };
// EmptyList.prototype.length = function() {
//   let len = 0
//   let a = this
//   while(a.next) {
//     len++
//     a = a.next 
//   }
//   return len
// };
// EmptyList.prototype.push = function(x) {
//   let me = this
//   return new ListNode(x,me)
// };
// EmptyList.prototype.remove = function(x) {
//     let parent = this
//     let stack = []
//     let len = parent.length()
//     while(len) {
//         if(parent.value !== x) {
//             stack.push({val: parent.value, idx: this.length() + 1 - len})
//         }
//         parent = parent.next
//         len--
//     }
//     let last = stack[stack.length - 1].idx
//     let res = this
//     while(last) {
//         res = res.tail()
//         last--
//     }
//     while(stack.length) {
//         res = res.push(stack.pop().val)
//     }
//     return res
// };
// EmptyList.prototype.append = function(xs) {
//   return xs
// };

// function ListNode(value, next) {
//   this.value = value
//   this.next = next
// }
// ListNode.prototype = new List();
// ListNode.prototype.constructor = ListNode;
// ListNode.prototype.push = function(x) {
//   let me = this
//   return new ListNode(x, me)
// }
// ListNode.prototype.toString = function() {
//   return EmptyList.prototype.toString.call(this)
// }
// ListNode.prototype.isEmpty = function() {
//   return EmptyList.prototype.isEmpty.call(this)
// }
// ListNode.prototype.length = function() {
//   let len = 0
//   let a = this
//   while(a.next) {
//     len++
//     a = a.next 
//   }
//   return len
// }
// ListNode.prototype.remove = function(x) {
//   return EmptyList.prototype.remove.call(this, x)
// }
// ListNode.prototype.head = function() {
//   if(!this.isEmpty) {
//     return this.value
//   }
// };
// ListNode.prototype.tail = function() {
//   if(!this.isEmpty()) {
//     return this.next
//   }
// };
// ListNode.prototype.append = function(x) {
//   let me = this
//   let stack = []
//   while(me && me.next) {
//     stack.push(me.value)
//     me = me.next
//   }
//   while(stack.length) {
// 	  x = x.push(stack.pop())
//   }
//   return x
// }