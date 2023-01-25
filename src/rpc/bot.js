const { getChannel } = require('../datasource/bbb/channel');

function rpc({ client }) {
    const routerPath = '/bot';
    const functions = {
        getStats: (args, cb) => {
            try {
                const memory = require('../utils/mem-status')();
                cb(null, memory);
            } catch (error) {
                console.log('rpc -> bot -> getStats')
                cb(error);
            }
        },
        sendMessage: (args, cb) => {
            try {
                const { message, channel, data } = args;
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
