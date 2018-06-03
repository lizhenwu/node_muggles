const { spawn } = require('child_process')
const fs = require('fs')
const out = fs.openSync('./out.log', 'a')
const err = fs.openSync('./out.log', 'a')

const subprocess = spawn(process.argv[0], ['test.js'], {
    detached: true,
    stdio: [ 'ignore', out, err ]
})

subprocess.unref()
process.on('exit', code => {
    console.log(`${process.pid} about to exit with code ${code}`)
})