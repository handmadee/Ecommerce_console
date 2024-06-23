'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');


const checkConnect = () => {
    const numConnect = mongoose.connections.length;
    console.log(`Number of connections: ${numConnect}`);
}

// check overload connect
const _SECONDS = 5000;
const checkOverloadConnect = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length;
        const numCpu = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnect = numCpu * 5;
        console.log('active connections: ', numConnect);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        if (numConnect > maxConnect) {
            console.log(`Overload connect: ${numConnect}`);
            process.exit(1);
        }
    }, _SECONDS);
}

module.exports = { checkConnect, checkOverloadConnect };