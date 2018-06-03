console.log(`${Date.now().toLocaleString()} start`)
setTimeout(() => {
    sleep(10000)
}, 2000)
function sleep(ms) {
    let start = Date.now()
    while(Date.now() < start + ms) {
        console.log(`[${new Date().toLocaleString()}]: 正在执行`)
    }
}
process.on('exit', () => {
    console.log('process %s exited...', process.pid)
})