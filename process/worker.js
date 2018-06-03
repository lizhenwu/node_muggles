const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(`handled by ${process.pid}`);
    throw new Error('throw error');
})
let worker;
process.on('message',function(m,tcp) {
    if(m === 'server');
    worker = tcp;
    worker.on('connection',function(socket) {
        server.emit('connection',socket);
    })
})
process.on('uncaughtException',function(err) {
    process.send({act: 'suicide'});
    worker.close(function() {
        process.exit(1);
    })
    setTimeout(function() {
        process.exit(1);
    },5000)
})