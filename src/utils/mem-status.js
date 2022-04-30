function getMem() {
    const os = require('os');

    const serverMemory = (os.totalmem() / (1024 * 1024));
    const freeMemory = (os.freemem() / (1024 * 1024));
    const memory = (process.memoryUsage().rss / (1024 * 1024));
    return { serverMemory, freeMemory, memory }
}

module.exports = getMem