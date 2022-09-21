function rpc({ client }) {
    const routerPath = '/bot';
    const functions = {
        getStats: (args, cb) => {
            const memory = require('../utils/mem-status')();
            cb(null, memory);
        },
        sendMessage: (args, cb) => {
            try {
                const { message, channel } = args;
                client.channels.cache.get(channel).send(message);
                cb(null, message);
            } catch (error) {
                console.log('rpc -> bot -> sendMessage')
                cb(error);
            }
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;
