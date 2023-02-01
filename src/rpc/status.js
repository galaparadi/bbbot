const logger = require('../logger/logger');

function rpc({ client }) {
    const routerPath = '/status';
    const functions = {
        getStat: (args, cb) => {
            try {
                const memory = require('../utils/mem-status')();
                cb(null, memory);
            } catch (error) {
                logger.error('rpc -> status -> getStat')
                logger.error(error.message);
                cb({ message: error.message });
            }
        },
        isMember: async (args, cb) => {
            const { key, id } = args;
            try {
                if (key !== 'secret') return cb({ message: "wrong secret key", code: 401 })
                let membersId = (await client.guilds.cache.at(0).members.fetch()).map(member => member.id);
                cb(null, membersId.includes(id) ? true : false);
            } catch (error) {
                logger.error('rpc -> status -> isMember');
                logger.error(error.message);
                return cb({ message: error.message })
            }
        },
        getRoles: async (args, cb) => {
            try {
                const roles = await client.guilds.cache.at(0).roles.fetch();
                cb(null, roles.map(role => ({ name: role.name, id: role.id })))
            } catch (error) {
                logger.error('rpc -> status -> getRoles')
                logger.error(error.message);
                return cb({ message: error.message });
            }
        },
    }
    return { routerPath, functions }
}

module.exports = rpc;