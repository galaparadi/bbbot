const { getChannel } = require('../datasource/bbb/channel');
const logger = require('../logger/logger');

function rpc({ client }) {
    const routerPath = '/bot';
    const functions = {
        getStats: (args, cb) => {
            try {
                const memory = require('../utils/mem-status')();
                cb(null, memory);
            } catch (error) {
                logger.error('rpc -> bot -> getStats')
                logger.error(error.message)
                cb({message: error.message});
            }
        },
        sendMessage: (args, cb) => {
            try {
                const { message, channel, data } = args;
                client.channels.cache.get(channel).send(message);
                cb(null, message);
            } catch (error) {
                logger.error('rpc -> bot -> sendMessage')
                cb({message: error.message});
            }
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;
