const logger = require('../logger/logger');

const route = '/members';
const handler = function (client) {
    return async function (req, res) {
        try {
            if (req.body.key !== 'secret') return res.json('mo');
            let membersId = (await client.guilds.cache.at(0).members.fetch()).map(member => member.id);
            res.json({ isMember: membersId.includes(req.body.id) ? 1 : 0 });
        } catch (error) {
            console.log('message member')
            logger.error(error);
            res.json({ error: error.message })
        }
    }
}

module.exports = { route, handler };