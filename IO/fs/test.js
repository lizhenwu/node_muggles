const fs = require('fs')

// function watchPromise(path, fn) {
//     return new Promise((resolve, reject) => {
//         fs.watch(path, (err, filename) => {
//             if(err) reject(err)
            
//         })
//     })
// }

// fs.watch('./tt.txt', (type, filename) => {
//     if(type == 'rename') {
//         console.log('this is a name change')
//         // console.log(filename)
//     }
//     console.log(filename)
// })
console.log(__dirname)