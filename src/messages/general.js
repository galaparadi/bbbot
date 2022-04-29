const channel = require('../enum/discord-channel');
const logger = require('../logger/logger');

const route = '/';
const handler = function (client) {
    return async function (req, res) {
        try {
            if (req.body.key !== 'secret') return;
            if (!channel[req.body.channel]) return res.json({ status: 0, error: "channel not found" })
            client.channels.cache.get(channel[req.body.channel]).send(req.body.message);
            res.json({ status: 1 });
        } catch (error) {
            logger.error(error);
            res.json({ error: error.message })
        }
    }
}

module.exports = { route, handler };