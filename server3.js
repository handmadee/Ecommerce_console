const cluster = require('cluster');
const { log } = require('console');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
    process.title = 'node_server'
    // Chia các process worer cho mỗi CPU 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Woker :: ${worker.process.pid} died`)
    })
} else {
    process.title = `node_${cluster.worker.id}`
    // lắng nghe y/c 
    require('./server')
}